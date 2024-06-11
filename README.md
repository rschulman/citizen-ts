# Citizen
Citizen is an effort to apply some of the benefits of citizen's assemblies to online interactions, particularly in comment spaces. It attempts to influence commenters more toward thoughtful critique by emphasizing existing reasonable comments, forcing users to consider opposing viewpoints before commenting, and framing other commenters as the user's "neighbors," rather than faceless others.

# User Experience
User comments are displayed below an article, as long as they have a high enough "thoughtfulness" score. When the user elects to submit a comment of their own, they are first asked whether they agree or disagree, on a sliding scale, with a question that attempts to summarize the topic of the article. In a real implementation this question could be provided by a human editor or perhaps via automated summary performed by a large language model. After indicating their opinion, the user is presented with an already-submitted comment whose author indicated they disagree with the user, and asked to rate its thoughtfulness. Their answer is averaged with responses from other users who viewed the same comment, and stored for later. Finally, the user is able to submit their own comment, and is reminded that it will not appear until it has been rated as thoughtful by others.

# Assumptions and Considerations
This project assumes that any system for user comments will have a web interface at the least and may additionally have a mobile app interface. A Javascript foundation therefore seemed appropriate. Because I tend to prefer typed environments I chose to implement Citizen in Typescript and I used the Vue reactive framework for UI. I also framed Citizen around a newspaper article as a backdrop, however the basic idea could be adapted to other situations.

I made the app behave as a single page out of a desire to not navigate the user too far away from the article they were responding to, and so most of the user interactions happen in a modal window on top of the article page.

# Progress
The basics of the user flow are all implemented. There is no persistence of data, so reloading the page wipes out all but the pre-seeded comments. There is obviously also no backend, and thus no API designed for passing the comments to a server for storage or dissemination to others.

The fundamentals of presenting a user with an opposing opinion are implemented, but there is interesting other experiments that it would be fascinating to do. I'd love to test how the phrasing of the sentiment question, the opposing viewpoint question, and the reminder about thoughtfulness in the user's own comment all influence the user's state of mind.

The system also would need some study on how users attempt to game it, perhaps by making many logins and upvoting their own content, deliberately downvoting others, and so on.

Finally, I'm curious about what the best way to have users convey sentiment is. Citizen right now uses a slider between two poles (ie, "agree" and "don't agree") that is represented behind the scenes as a number from 0.0 to 10.0. The theory behind this is that it might result in greater honesty from users than a more quantitative response mechanism, but I have no idea if that is actually true in practice.

# Metrics
To determine how well the system is working, a number of metrics might be useful. First, knowing how many people wanted to make a comment but bounced off the preliminary questions would give an idea as to how burdensome the commenting system overall is, and whether it is so problematic as to discourage any interaction whatsoever. I have attempted to make the interactions as simple as possible and quick to get through, but perhaps there is some room for improvement there if needed.

Second, I would be very curious to track over time how much agreement there on the "thoughtfulness" of comments, particularly between groups that answer differently on their opinions of the prompt question. If people can generally agree as to what makes for a thoughtful comment, then it would be worth tweaking the rest of the system to try to encourage that behavior. If, however, there isn't even agreement on that fundamental point, then the system more broadly would need to be reexamined.

# Running
Citizen requires `node` and either `npm` or `yarn`. Running (e.g.) `yarn dev` will start a development server running on `http://localhost:5173/`.