const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

/*
 * Welcome to Team #1747's scouting API!
 * Here, you'll find lots of useful information. If you're here to edit this file, be sure to PROPERLY comment.
 *
 * If you have no clue where to start, please email Daniel Gallups, at dsgallups@gmail.com. Hopefully I'll still be around to help!
 */

//Server is located at 128.211.235.107
mongoose.connect('mongodb://128.211.235.107/frc')
    .then(() => console.log("Connected to MongoDB, frc db."))
    .catch(err => console.error("Could not connect to MongoDB...", err));


/*
 * To model our schema, I've posted a layout of what the POSTED JSON will look like
 *  {
 *      initials: {
 *          team_id: <team_no>,
 *          pos: ['<L/M/R>','<T/B>',
 *          gamepiece: '<hatch/cargo>',
 *          preloaded: [
 *              {
 *                  cargo_type: '<hatch/cargo>',
 *                  col: <no>,
 *                  row: <no>
 *              },
 *              {
 *                  ...
 *              }
 *          ]
 *      },
 *      sandstorm: {
 *          autonomous: "<T/F>",
 *          hit_1747: "<T/F>",
 *          points: [
 *                  {
 *                      cargo_type: "<hatch/cargo>",
 *                      col: <no>,
 *                      row: <no>
 *                  },
 *                  {
 *                      ...
 *                  }
 *          ]
 *      },
 *      teleop: {
 *          points: [
 *              {
 *                  cargo_type: "<hatch/cargo>",
 *                  col: <no>,
 *                  row: <no>
 *              },
 *              {
 *                  ...
 *              }
 *          ]
 *      }
 *      endgame: {
 *          climb_level: <0-3>,
 *          buddy_climb: [<no of bots bot lifted>, "<did it lift itself? T/F>"]
 *          win: "<T/F>"
 *      },
 *      notes: "<string>"
 *  }
 */

//Create this schema now (r stands for robot :)
const rSchema = new mongoose.Schema({
    initials: {
        team_id: Number,
        pos: [String],
        gamepiece: String,
        preloaded: [Schema.Types.Mixed]
    },
    sandstorm: {
        autonomous: Boolean,
        hit_1747: Boolean,
        points: [Schema.Types.Mixed],
    },
    teleop: {
        points: [Schema.Types.Mixed]
    },
    endgame: {
        climb_level: Number,
        buddy_climb: [Schema.Types.Mixed]
        win: Boolean
    }
    notes: String
});

const TeamMatch = mongoose.model('TeamMatch', rSchema);

//Now we need to handle POSTs:
app.post('/frc', (req, res) => {
    const schema = {
        initals: {
            team_id: Joi.number().integer(),
            pos: Joi.array().items(Joi.string()),
            gamepiece: Joi.string().valid('hatch','cargo'),
            preloaded: Joi.array()
        },
        sandstorm: {
            autonomous: Joi.boolean(),
            hit_1747: Joi.boolean(),
            points: Joi.array()
        },
        teleop: {
            points: Joi.array()
        },
        endgame: {
            climb_level: Joi.number().min(0).max(3),
            buddy_climb: Joi.array(),
            win: Joi.boolean()
        }
        notes: Joi.string()
    }

    //Based on the schema above, we'll compare whatever JSON was posted to us with that and store the returned JSON in val
    const result = Joi.validate(req.body, schema);

    //If there's an error, result.error will exist. We'll return the entire result object with HTTP code 400.
    if (result.error) {
        res.status(400).send(result);
        return;
    }

    //Now we're going to create an object based off the schema. I know this seems a bit repetitive, but I want to be ABSOLUTELY certain that we're following this defined schema. Every program has holes, and this is a measure to prevent that. Also, I'm not sure how to send a raw JSON to mongod
    const o = req.body;
    const teamMatch = new TeamMatch({
        initials: {
            team_id: o.initials.team_id,
            pos: o.initials.pos,
            gamepiece: o.initials.gamepiece,
            preloaded: o.initials.preloaded
        },
        sandstorm: {
            autonomous: o.sandstorm.autonomous,
            hit_1747: o.sandstorm.hit_1747,
            points: o.sandstorm.points
        },
        teleop: {
            points: o.teleop.points
        },
        endgame: {
            climb_level: o.endgame.climb_level,
            buddy_climb: o.endgame.buddy_climb,
            win: o.endgame.win
        },
        notes: o.notes
    });

    //Now our obj is in teamMatch, lets send it to the DB.
    async function sendTeamMatch() {
        const result = await teamMatch.save();
        console.log(result);
        res.send(result)
    }
    sendTeamMatch();
});

//listen on a certain port. I chose 3000.
app.listen(3000);
