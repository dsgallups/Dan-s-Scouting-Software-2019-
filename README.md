Dan's Scouting Software (2019)

# Programming priorities
0. Add the "event" parameter to our scouting app
1. Create changeable heatmap based off parameters in the analytics
1. Add the "crossed line" param to our scouting app
2. TBA API for viewing matches??

   We can use this API also to verify our scouting forms. In the details section, each match will have more info, with the json attached. We can then compare TBA data to our scouted software.
   
3. Create generalized heatmap for all listed teams (with option to disable this)
4. Create app to pit teams against each other and determine probability of winning
5. Font awesome additions

# Idea

For our scouting app, There are a few redundancies that we can fix. Here's some basic logic:

1. Scouter fills in the preloaded pieces.
2. If there's a hatch panel in one spot, we know for sure that they cannot score a hatch panel in sandstorm NOR teleop. Therefore, the hatch panel option AND both option should be disabled.
3. If there's cargo in one spot, we know for sure that they cannot score a cargo in sandstorm. However, in teleop, we know that they can score hatch panels and cargo.
4. SVG redesign?

5. Optionally, we can just redo everything.