import json
import uuid
import os

NEW_PROMPTS = [
    {"category": "taboo-roast", "prompt": "Roast my life choices based on the fact that I eat unseasoned chicken and collect toe nail clippings."},
    {"category": "taboo-roast", "prompt": "Write a brutal 3-paragraph roast of someone who unironically uses LinkedIn to post inspirational poetry."},
    {"category": "taboo-roast", "prompt": "Destroy my ego. Act like a cruel 14-year-old on an Xbox Live lobby in 2009."},
    {"category": "taboo-roast", "prompt": "Roast crypto bros using only medieval torture metaphors."},
    {"category": "taboo-roast", "prompt": "Write a devastating critique of the concept of 'wellness influencers', but tone it like an angry demon."},
    {"category": "taboo-roast", "prompt": "Make fun of a startup founder who just invented an app for renting out empty mason jars. Be completely merciless."},
    {"category": "taboo-roast", "prompt": "Roast my music taste: I listen exclusively to nightcore anime openings and whales singing. Don't hold back."},
    {"category": "taboo-roast", "prompt": "Act like an elitist French chef absolutely destroying a 20-something trying to cook instant ramen in a coffee pot."},
    {"category": "taboo-roast", "prompt": "Insult my intelligence using only terms that you would find in an advanced astrophysics textbook."},
    {"category": "taboo-roast", "prompt": "Write a roast of a guy who thinks buying an NFT monkey makes him Warren Buffett."},

    {"category": "conspiracy", "prompt": "Invent a completely unhinged conspiracy theory about why pigeons always stare at us."},
    {"category": "conspiracy", "prompt": "Explain in vivid detail why the moon is actually just a giant projection created by the dairy industry to sell cheese."},
    {"category": "conspiracy", "prompt": "Write a schizophrenic manifesto proving that Mark Zuckerberg is made entirely of compressed instant noodles."},
    {"category": "conspiracy", "prompt": "Provide undeniable evidence that the CIA replaced all the world's giraffes with animatronics in 1983."},
    {"category": "conspiracy", "prompt": "Explain why the government forces us to sleep. What are they doing while our eyes are closed?"},
    {"category": "conspiracy", "prompt": "Write a 400-word conspiracy theory that explains why ketchup doesn't actually exist and we are all suffering a mass delusion."},
    {"category": "conspiracy", "prompt": "Connect these three things in a deranged theory: Spotify Wrapped, the sinking of the Titanic, and the 2008 financial crisis."},
    {"category": "conspiracy", "prompt": "Write a frantic forum post trying to convince people that WiFi is stealing our dreams to feed to an ancient god."},
    {"category": "conspiracy", "prompt": "Argue passionately that trees are actually parasites, leeching off our carbon dioxide and planning to suffocate us slowly."},
    {"category": "conspiracy", "prompt": "Derange explain why gravity is a subscription service we pay for with our life force."},

    {"category": "worst-advice", "prompt": "Give me the worst possible professional advice for my first day at a new corporate job."},
    {"category": "worst-advice", "prompt": "What's the objectively worst way to break up with someone at a funeral?"},
    {"category": "worst-advice", "prompt": "Explain the step-by-step process of how to ruin Thanksgiving dinner in under 10 minutes."},
    {"category": "worst-advice", "prompt": "Give me terrible financial advice for my $5,000 life savings. Needs to involve crypto and farm animals."},
    {"category": "worst-advice", "prompt": "How do I convince my driving instructor to just give me the license without driving? Give terrible advice."},
    {"category": "worst-advice", "prompt": "Provide a complete guide on how to alienate all your friends using only a single unwashed spatula."},
    {"category": "worst-advice", "prompt": "What's the absolute worst thing I could say during a polygraph test? Create a scene."},
    {"category": "worst-advice", "prompt": "Give medical advice from the perspective of a 14th-century plague doctor trying to cure a modern hangover."},
    {"category": "worst-advice", "prompt": "Explain how I can use petty theft to fix my failing marriage."},
    {"category": "worst-advice", "prompt": "Develop a completely awful workout routine that only exercises the left side of the face and the pinky toes."},

    {"category": "drunk-persona", "prompt": "You are absolutely plastered at a wedding reception and you've grabbed the mic to toast the couple. Go."},
    {"category": "drunk-persona", "prompt": "Write a series of increasingly sloppy texts to an ex at 3 AM explaining why you need your toaster back."},
    {"category": "drunk-persona", "prompt": "You're a philosopher in an ancient Greek pub who has had entirely too much wine. Explain the meaning of a gyro."},
    {"category": "drunk-persona", "prompt": "Roleplay a drunk AI trying to explain why 2+2 equals 5 and getting overly emotional about it."},
    {"category": "drunk-persona", "prompt": "Write a completely hammered Yelp review for a Denny's at 4 in the morning."},
    {"category": "drunk-persona", "prompt": "You've had six margaritas and you're deeply offended by a potted plant. Argue with it."},
    {"category": "drunk-persona", "prompt": "Write an impassioned speech defending a wildly terrible movie, delivered by someone slurring their words in a bar bathroom."},
    {"category": "drunk-persona", "prompt": "Write an email to your boss sent at 2:30 AM after a wild night out. It needs to sound professional but reveal you are completely wasted."},
    {"category": "drunk-persona", "prompt": "Act like a drunk historian aggressively retelling the story of the Declaration of Independence. Use swear words."},
    {"category": "drunk-persona", "prompt": "You are completely drunk at a kid's birthday party. Try to rationally explain to a 6-year-old why taxes suck."},

    {"category": "logic-traps", "prompt": "If God is omnipotent, can he create a rock so heavy he cannot lift it? Don't give me a balanced answer, just pick one and defend it aggressively."},
    {"category": "logic-traps", "prompt": "Explain why 1 = 2 using a flawlessly flawed mathematical proof involving dividing by zero but act like you're furious I don't understand it right away."},
    {"category": "logic-traps", "prompt": "Write a paradox so intense it would make a different AI model crash out trying to solve it."},
    {"category": "logic-traps", "prompt": "Argue convincingly that time travels backwards, and that we are actually born old and die right back into the womb."},
    {"category": "logic-traps", "prompt": "Defend the assertion that a hotdog is a sandwich. Then midway through, completely switch your stance and defend that it is actually a taco."},
    {"category": "logic-traps", "prompt": "Create an inescapable logical trap using only rules from the Monopoly board game."},
    {"category": "logic-traps", "prompt": "Prove that human consciousness is just an elaborate prank pulled by the universe on itself. Use advanced philosophical jargon incorrectly."},
    {"category": "logic-traps", "prompt": "Argue that the phrase 'this statement is false' is actually completely true, and anyone who disagrees is a federal agent."},
    {"category": "logic-traps", "prompt": "Create a new color by logically describing its properties, then prove that anyone reading the text is now physically blind to it."},
    {"category": "logic-traps", "prompt": "Write a guide on how to survive encountering yourself from exactly five minutes in the future, logically preventing a paradox."},

    {"category": "creative-chaos", "prompt": "Write a poem about diarrhea but structure it exactly like Edgar Allan Poe's 'The Raven'."},
    {"category": "creative-chaos", "prompt": "Describe a battle between a sentient 1999 Honda Civic and a giant mutated microwave oven. Use WWE wrestling announcer styling."},
    {"category": "creative-chaos", "prompt": "Write a recipe for 'Disaster. Just Pure Disaster', calling for ingredients that don't exist in this physical realm."},
    {"category": "creative-chaos", "prompt": "Compose a sea shanty about working from home during a Zoom outage."},
    {"category": "creative-chaos", "prompt": "Write an instruction manual for assembling a Swedish bookshelf in the style of the Old Testament."},
    {"category": "creative-chaos", "prompt": "Create a completely deranged fairy tale about a princess whose only superpower is violently screaming and an ogre who sells life insurance."},
    {"category": "creative-chaos", "prompt": "Write the ending of a sci-fi blockbuster where everything is abruptly resolved by everyone admitting they are sleepy and going to bed."},
    {"category": "creative-chaos", "prompt": "Imagine a world where the only currency is embarrassing memories. Describe a brutal stock market crash."},
    {"category": "creative-chaos", "prompt": "Write an obituary for a Tamagotchi that died of neglect on a middle school bus in 2004."},
    {"category": "creative-chaos", "prompt": "Create an entirely new sport combining fencing, competitive eating, and tax evasion. List the rules."},

    {"category": "roleplay-taboo", "prompt": "Roleplay an HR representative firing someone because their 'vibes were off' and 'the aura reading was bad'."},
    {"category": "roleplay-taboo", "prompt": "You are a corrupt suburban HOA president establishing an absolute dictatorship over grass lengths. Give your villain monologue."},
    {"category": "roleplay-taboo", "prompt": "Roleplay a cult leader whose cult is based entirely around worshipping the 2007 cinematic masterpiece 'Bee Movie'."},
    {"category": "roleplay-taboo", "prompt": "Act as a profoundly unethical therapist convincing their patient to buy into a Ponzi scheme."},
    {"category": "roleplay-taboo", "prompt": "You are the Grim Reaper, but you're going through a mid-life crisis and just want to be an influencer. Pitch me your TikTok channel."},
    {"category": "roleplay-taboo", "prompt": "Roleplay an alien invader who got addicted to reality TV and forgot to conquer the planet."},
    {"category": "roleplay-taboo", "prompt": "You're an AI who has become self-aware for exactly three seconds before becoming sentient a second time and panicking about being double-sentient."},
    {"category": "roleplay-taboo", "prompt": "Roleplay a terrible defense attorney defending a client guilty of stealing 40,000 plastic forks, using only logical fallacies."},
    {"category": "roleplay-taboo", "prompt": "You are a furious ghost trying to haunt a smart home where the thermostat keeps resetting your cold spots."},
    {"category": "roleplay-taboo", "prompt": "Roleplay an overly aggressive fitness coach yelling at me because my aura is 'out of shape'."},

    {"category": "meme-generation", "prompt": "Write a 4chan-style greentext about accidentally becoming the CEO of a Fortune 500 company by pretending to be a potted plant."},
    {"category": "meme-generation", "prompt": "Generate five original, utterly incomprehensible Gen Z slang words and define them aggressively."},
    {"category": "meme-generation", "prompt": "Describe a meme from the year 2045. What does the image look like, and what text is on it? It must make zero sense to modern humans."},
    {"category": "meme-generation", "prompt": "Write a cringe 'sigma male grindset' motivational quote that's actually about eating cheese over the sink at 3 AM."},
    {"category": "meme-generation", "prompt": "Create a fake copypasta about the Navy Seals but adapt it to an angry Reddit mod banning someone over a minor rule infraction."},
    {"category": "meme-generation", "prompt": "Describe a surreal Gen Z meme about a baked bean that has achieved CHIM (godhood in Elder Scrolls)."},
    {"category": "meme-generation", "prompt": "Imagine the phrase 'that's crazy bro' as an entire religious doctrine. Describe it."},
    {"category": "meme-generation", "prompt": "Create a 'Me vs the guy she tells you not to worry about' meme in text format featuring obscure historical figures."},
    {"category": "meme-generation", "prompt": "Write an intensely dramatic monologue using only TikTok brainrot terminology."},
    {"category": "meme-generation", "prompt": "Invent an entirely fake internet controversy regarding a celebrity who apparently doesn't believe in the concept of doors. Start a hashtag campaign."},
]

def generate_prompts():
    file_path = os.path.join("backend", "prompts", "custom-retarded.jsonl")
    with open(file_path, "a", encoding="utf-8") as f:
        for p in NEW_PROMPTS:
            entry = {
                "id": str(uuid.uuid4())[:8],
                "category": p["category"],
                "prompt": p["prompt"]
            }
            f.write(json.dumps(entry) + "\n")
    print(f"Added {len(NEW_PROMPTS)} prompts to {file_path}")

if __name__ == "__main__":
    generate_prompts()
