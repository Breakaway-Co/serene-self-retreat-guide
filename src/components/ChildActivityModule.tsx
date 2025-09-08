import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star, Palette, RotateCcw, Play, Pause, Square, Heart, Mic, MicOff, Timer, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AudioGuidance from "./AudioGuidance";
import ActivityGuide from "./ActivityGuide";
import GuidedSteps from "./GuidedSteps";
import InteractiveChoices from "./InteractiveChoices";

interface RetreatModule {
  id: string;
  type: string;
  title: string;
  narration: string;
  caregiverTip: string;
  options?: string[];
  assets: string[];
}

interface ChildActivityModuleProps {
  module: RetreatModule;
  onBack: () => void;
  onComplete: (moduleId: string) => void;
}

const ChildActivityModule = ({ module, onBack, onComplete }: ChildActivityModuleProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(module.id);
    toast({
      title: "Great job! ⭐",
      description: "You completed this activity. You're doing amazing!",
    });
  };

  const renderActivityContent = () => {
    switch (module.type) {
      case 'builder':
        return (
          <ActivityGuide
            title="Building Your Emotions First Aid Toolbox"
            activityType="builder"
            introduction="Let's create a special collection of things that help when feelings get big or overwhelming. This is your personal comfort kit!"
            guideMessages={[
              {
                type: 'instruction',
                content: "🧸 Hi there! I'm your activity guide, and I'm so excited to help you build something really special today. We're going to make an emotions first aid toolbox - just like doctors have medical first aid kits, we're making one for feelings!"
              },
              {
                type: 'encouragement',
                content: "💝 You know what's amazing? Every person's toolbox is different because we all find comfort in different things. That's what makes you special and unique!"
              },
              {
                type: 'instruction',
                content: "🎯 Here's how we'll do this: First, I'll show you lots of different things that can help with big feelings. Then, you'll choose the ones that feel right for YOU. Finally, we'll talk about why they're special."
              },
              {
                type: 'tip',
                content: "💡 Remember, there are no wrong choices here. If something makes you feel better, safer, or happier, then it belongs in your toolbox!"
              }
            ]}
            audioInstructions={[
              "Welcome to your emotions first aid toolbox activity",
              "Take a deep breath and get comfortable",
              "We're going to explore what helps you feel better when emotions feel big"
            ]}
          >
            <div className="space-y-6">
              <InteractiveChoices
                title="Choose Your Comfort Items"
                description="Pick the things that make you feel safe, calm, or happy. You can choose as many as you want!"
                activityType="emotion"
                choices={[
                  {
                    id: 'soft_toy',
                    emoji: '🧸',
                    title: 'Soft Toy',
                    description: 'A stuffed animal, blanket, or something cuddly',
                    guidance: "Soft toys are wonderful! They can give us hugs when we need them and help us feel less alone. You can hold them tight when feelings get big.",
                    followUp: "Tell me about your soft toy. What makes it special? How does it help you feel better?"
                  },
                  {
                    id: 'art_supplies',
                    emoji: '🎨',
                    title: 'Art Supplies',
                    description: 'Crayons, markers, paper for drawing feelings',
                    guidance: "Art is a fantastic way to show feelings when words feel too hard! Sometimes drawing or coloring helps our feelings come out safely.",
                    followUp: "What kind of art do you like to make? Do you like to draw pictures, use lots of colors, or something else?"
                  },
                  {
                    id: 'photos',
                    emoji: '📸',
                    title: 'Special Photos',
                    description: 'Pictures of people you love or happy memories',
                    guidance: "Photos help us remember love and happy times, especially when we're feeling sad or scared. They remind us we're not alone!",
                    followUp: "What photos would you put in your toolbox? Who or what makes you smile when you see their picture?"
                  },
                  {
                    id: 'music',
                    emoji: '🎵',
                    title: 'Music or Sounds',
                    description: 'Songs, lullabies, or peaceful sounds',
                    guidance: "Music has special powers! It can help us feel calm, happy, or even help us cry when we need to. Different songs help with different feelings.",
                    followUp: "What music or sounds help you feel better? Do you like calm music, happy songs, or nature sounds?"
                  },
                  {
                    id: 'special_object',
                    emoji: '💎',
                    title: 'Special Object',
                    description: 'A stone, shell, or meaningful item you can hold',
                    guidance: "Special objects can be like magical helpers! When we hold them, they remind us of good feelings or important people.",
                    followUp: "Do you have a special object that's important to you? What makes it special?"
                  },
                  {
                    id: 'journal',
                    emoji: '📝',
                    title: 'Journal or Notebook',
                    description: 'A place to write or draw your thoughts',
                    guidance: "Writing or drawing our thoughts is like emptying our backpack when it gets too heavy. It helps make space in our hearts and minds!",
                    followUp: "What would you like to write or draw in your journal? Stories, feelings, pictures, or something else?"
                  }
                ]}
                onChoiceSelect={(choiceId) => setSelectedOption(choiceId)}
                onResponseComplete={(choiceId, response) => setUserInput(response)}
              />

              <div className="p-4 bg-calm/10 rounded-lg border border-calm/20">
                <h4 className="font-medium text-calm mb-3 text-center">🌟 Your Toolbox Building Progress</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Items chosen:</span>
                    <span className="font-medium text-calm">{selectedOption ? '1+' : '0'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Personal stories shared:</span>
                    <span className="font-medium text-calm">{userInput.length > 10 ? '✓' : 'Coming up...'}</span>
                  </div>
                </div>
              </div>

              {selectedOption && userInput && (
                <Card className="shadow-gentle border-healing/30 bg-gradient-to-r from-healing/10 to-calm/10">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Star className="w-8 h-8 text-healing mx-auto mb-2 fill-current" />
                      <h4 className="font-medium text-healing mb-2">Beautiful Work! 🌟</h4>
                      <p className="text-sm text-muted-foreground">
                        You're building something really special here. Your toolbox is going to help you feel stronger and more confident when big feelings come up. 
                        Remember, you can always add new things to your toolbox as you discover what helps you!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </ActivityGuide>
        );

      case 'spinner':
        return (
          <ActivityGuide
            title="Activity Wheel Adventure"
            activityType="spinner"
            introduction="Sometimes the best adventures happen when we let surprise choose for us! Let's spin the wheel and see what gentle activity wants to play with us today."
            guideMessages={[
              {
                type: 'instruction',
                content: "🎪 Hello, adventure friend! I love this activity because it brings surprises and fun into our day. We never know what we'll get, and that's the exciting part!"
              },
              {
                type: 'encouragement',
                content: "🌟 You know what's wonderful about spinning wheels? There are no wrong answers! Whatever we get is exactly what we need today. Trust the magic!"
              },
              {
                type: 'tip',
                content: "💫 If you don't like what you spin, that's okay! You can always spin again, or we can adapt the activity to work better for you. This is YOUR adventure!"
              }
            ]}
            audioInstructions={[
              "Welcome to the activity wheel adventure",
              "Take a moment to get excited about the surprise ahead",
              "Remember, whatever we spin will be perfect for today"
            ]}
          >
            <div className="space-y-6">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-nature/20 via-calm/20 to-healing/20 rounded-full border-4 border-nature/30 flex items-center justify-center shadow-xl transition-all duration-300 hover:shadow-2xl">
                  {selectedOption ? (
                    <div className="text-center animate-in zoom-in-50 duration-500">
                      <div className="text-6xl mb-3">🎯</div>
                      <p className="text-lg font-medium text-nature mb-2">
                        {selectedOption.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your special activity for today!
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-3 animate-pulse">🎪</div>
                      <p className="text-lg font-medium text-nature mb-2">Ready to spin?</p>
                      <p className="text-sm text-muted-foreground">
                        What adventure awaits you today?
                      </p>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="nature"
                  size="lg"
                  className="mt-6 mx-auto block min-w-[200px] text-lg py-6"
                  onClick={() => {
                    const activityOptions = {
                      'colouring': '🎨 Mindful Coloring',
                      'breathing_bubbles': '🫧 Bubble Breathing',
                      'music_time': '🎵 Musical Moments',
                      'nature_walk': '🌿 Nature Connection',
                      'sensory_play': '🤲 Touch & Feel',
                      'stretch_sway': '🌸 Gentle Movement'
                    };
                    
                    const options = module.options || Object.keys(activityOptions);
                    const randomOption = options[Math.floor(Math.random() * options.length)];
                    setSelectedOption(randomOption);
                  }}
                >
                  <RotateCcw className="w-5 h-5 mr-3" />
                  {selectedOption ? 'Spin Again!' : 'Spin the Wheel!'}
                </Button>
              </div>

              {selectedOption && (
                <div className="animate-in slide-in-from-bottom-5 duration-500">
                  <InteractiveChoices
                    title={`Let's Do: ${selectedOption.replace('_', ' ').toUpperCase()}`}
                    description="Here are some ways to enjoy your activity. Choose what feels right for you today!"
                    activityType="activity"
                    choices={
                      selectedOption === 'colouring' ? [
                        {
                          id: 'free_draw',
                          emoji: '🎨',
                          title: 'Free Drawing',
                          description: 'Draw whatever comes to your heart',
                          guidance: "Free drawing is wonderful! Let your hand move however it wants. There's no right or wrong - just let your feelings flow through colors and shapes.",
                          followUp: "What did you draw? What colors did you choose? How did it feel to let your creativity flow?"
                        },
                        {
                          id: 'feeling_colors',
                          emoji: '🌈',
                          title: 'Feeling Colors',
                          description: 'Color how your emotions look today',
                          guidance: "This is so special! Different feelings have different colors. Maybe happy is yellow, calm is blue, or excited is orange. Trust what feels right!",
                          followUp: "What colors represent your feelings today? Which feeling-color was strongest?"
                        }
                      ] : selectedOption === 'breathing_bubbles' ? [
                        {
                          id: 'real_bubbles',
                          emoji: '🫧',
                          title: 'Bubble Blowing',
                          description: 'Blow real bubbles and watch them float',
                          guidance: "Real bubbles are magical! Take a slow breath in, then blow gently and steadily. Watch the bubbles float away, taking any worried feelings with them.",
                          followUp: "How many bubbles did you blow? Did you watch them pop or float away? How do you feel after bubble breathing?"
                        },
                        {
                          id: 'imaginary_bubbles',
                          emoji: '💭',
                          title: 'Imaginary Bubbles',
                          description: 'Pretend to blow bubbles with your breath',
                          guidance: "Imagination bubbles are just as powerful! Breathe in slowly, then breathe out like you're blowing the most beautiful bubble. Picture it floating away with any big feelings.",
                          followUp: "What color were your imaginary bubbles? Where did they float to? What feelings did they take with them?"
                        }
                      ] : selectedOption === 'music_time' ? [
                        {
                          id: 'dance_free',
                          emoji: '💃',
                          title: 'Free Dance',
                          description: 'Move your body however feels good',
                          guidance: "Your body knows how to dance! There's no right way - just move however feels good. Fast, slow, big movements, tiny movements - it's all perfect!",
                          followUp: "How did your body want to move? Did you feel any emotions while dancing? What was your favorite movement?"
                        },
                        {
                          id: 'sing_along',
                          emoji: '🎤',
                          title: 'Sing Along',
                          description: 'Sing a favorite song or make up your own',
                          guidance: "Singing is like giving your heart a voice! You can sing loud, soft, silly, or serious. Maybe make up a song about how you're feeling today!",
                          followUp: "What did you sing about? Did you make up any new words? How did singing make you feel?"
                        }
                      ] : [
                        {
                          id: 'gentle_way',
                          emoji: '🌸',
                          title: 'Gentle Approach',
                          description: 'Take it slow and easy',
                          guidance: `This activity is perfect for taking things slow and gentle. Listen to your body and heart - they'll tell you exactly what you need.`,
                          followUp: "How did this gentle activity feel? What did your body or heart tell you while you were doing it?"
                        },
                        {
                          id: 'playful_way',
                          emoji: '🎈',
                          title: 'Playful Approach',
                          description: 'Make it fun and energetic',
                          guidance: `Playing is one of the best ways to feel good! Let yourself be silly, laugh, and enjoy every moment. There's no wrong way to play!`,
                          followUp: "What was the most fun part? Did you laugh or smile? How did playing make you feel?"
                        }
                      ]
                    }
                    onChoiceSelect={(choiceId) => setSelectedOption(selectedOption + '_' + choiceId)}
                    onResponseComplete={(choiceId, response) => setUserInput(response)}
                  />

                  <div className="p-4 bg-nature/10 rounded-lg mt-6">
                    <h4 className="font-medium text-nature mb-2">Activity Reflection</h4>
                    <Textarea
                      placeholder="How was your activity adventure? What surprised you? What would you want to try again? You can write, draw, or ask someone to help you share..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="mt-2 min-h-24"
                    />
                  </div>
                </div>
              )}
            </div>
          </ActivityGuide>
        );

      case 'audio_rest':
        return (
          <ActivityGuide
            title="Cuddle Time - Rest & Listen Together"
            activityType="audio_rest"
            introduction="Sometimes our hearts and bodies need quiet time to feel better. Let's create a cozy, safe space where you can rest and listen to gentle sounds."
            guideMessages={[
              {
                type: 'instruction',
                content: "🧸 Hi sweetie! I'm here to help you have the most peaceful rest time. We're going to create a special cozy nest where you can feel completely safe and loved."
              },
              {
                type: 'encouragement',
                content: "💝 You know what's wonderful? Your body is so smart - it knows how to feel better when you give it gentle rest time. You're taking such good care of yourself!"
              },
              {
                type: 'tip',
                content: "🌙 There's no wrong way to rest. You can lie down, sit up, hold something soft, or even gently move if that feels better. Listen to what your body wants!"
              }
            ]}
            audioInstructions={[
              "Welcome to your special cuddle and rest time",
              "Find your coziest spot and get comfortable",
              "We're going to breathe together and feel peaceful"
            ]}
          >
            <div className="space-y-6">
              <InteractiveChoices
                title="Create Your Cozy Nest"
                description="How would you like to make your rest time extra special today?"
                activityType="emotion"
                choices={[
                  {
                    id: 'teddy_cuddle',
                    emoji: '🧸',
                    title: 'Teddy Bear Cuddles',
                    description: 'Hold something soft and cuddly',
                    guidance: "Teddy bears and soft things are like magical comfort helpers! They remind us we're not alone and give us something safe to hold when feelings feel big.",
                    followUp: "What soft friend did you choose to cuddle with? How does it feel to hold them?"
                  },
                  {
                    id: 'blanket_nest',
                    emoji: '🌙',
                    title: 'Blanket Nest',
                    description: 'Wrap up cozy in your favorite blanket',
                    guidance: "Blankets are like gentle hugs that last as long as you need them! They help your body feel warm and safe, just like being in a cozy bird's nest.",
                    followUp: "How does your blanket nest feel? Are you perfectly cozy and warm?"
                  },
                  {
                    id: 'pillow_fort',
                    emoji: '🏰',
                    title: 'Pillow Fort',
                    description: 'Build a special safe space with pillows',
                    guidance: "Pillow forts are amazing! They're like your own private peaceful kingdom where only good feelings are allowed. You're the ruler of this cozy space!",
                    followUp: "Tell me about your pillow fort! What makes it feel extra safe and special?"
                  },
                  {
                    id: 'lap_cuddles',
                    emoji: '💗',
                    title: 'Lap Cuddles',
                    description: 'Snuggle with your caregiver',
                    guidance: "Lap cuddles are the most special! There's something magical about feeling someone who loves you holding you safe. Their heartbeat can help your heart feel calmer too.",
                    followUp: "How do lap cuddles feel? Can you feel the love and safety around you?"
                  }
                ]}
                onChoiceSelect={(choiceId) => setSelectedOption(choiceId)}
                onResponseComplete={(choiceId, response) => setUserInput(response)}
              />

              <div className="p-6 bg-healing/10 rounded-lg border border-healing/20">
                <h4 className="font-medium text-healing mb-4 text-center">🎵 Peaceful Listening Time</h4>
                <AudioGuidance
                  guideId="child-peaceful-listening"
                  guideName="Peaceful Listening Time"
                  activityType="rest"
                  instructions={[
                    "Let's start with three gentle breaths together",
                    "Breathe in slowly... and out slowly...",
                    "Feel your body getting more relaxed",
                    "You are safe, you are loved, you are enough",
                    "Let any worried thoughts float away like clouds",
                    "Just rest here in this peaceful moment"
                  ]}
                />
                
                <div className="mt-4 p-3 bg-healing/20 rounded text-center">
                  <p className="text-sm text-healing">
                    <Timer className="w-4 h-4 inline mr-1" />
                    Take as much time as you need. There's no rush at all.
                  </p>
                </div>
              </div>

              <GuidedSteps
                activityType="feelings"
                steps={[
                  {
                    id: 'settle_in',
                    title: 'Settle Into Your Cozy Space',
                    description: 'Get comfortable and feel safe',
                    guidance: "Take a moment to wiggle around until you feel just right. Maybe stretch a little, fluff your pillow, or adjust your blanket. Your body will tell you when it feels perfect!",
                    encouragement: "Perfect! You've created such a beautiful, safe space for yourself! 🌟"
                  },
                  {
                    id: 'breathing_together',
                    title: 'Breathing Together',
                    description: 'Take slow, gentle breaths',
                    guidance: "Let's breathe together like we're blowing bubbles very slowly. In through your nose... and out through your mouth. Your grown-up can breathe with you!",
                    encouragement: "Beautiful breathing! You're helping your whole body feel calmer! 💙"
                  },
                  {
                    id: 'listening_time',
                    title: 'Peaceful Listening',
                    description: 'Listen to gentle sounds and music',
                    guidance: "Now just listen to the peaceful sounds. You might hear music, nature sounds, or just the quiet. Let the sounds wrap around you like a gentle hug.",
                    encouragement: "You're such a good listener! Your heart is getting more peaceful! 🎵"
                  },
                  {
                    id: 'feeling_check',
                    title: 'Gentle Feeling Check',
                    description: 'Notice how you feel after resting',
                    guidance: "Take a moment to notice how your body and heart feel now. Are they more peaceful? Different? That's okay - there's no right or wrong way to feel!",
                    encouragement: "You took such wonderful care of yourself! You should feel proud! ✨"
                  }
                ]}
                onAllComplete={() => {
                  toast({
                    title: "Beautiful Rest Time! 🌙",
                    description: "You gave yourself the gift of peaceful rest. That's so important!",
                  });
                }}
              />

              <div className="p-4 bg-healing/10 rounded-lg">
                <h4 className="font-medium text-healing mb-2">After Your Rest Time</h4>
                <Textarea
                  placeholder="How do you feel after your peaceful rest? What was your favorite part? Did your body feel different? You can write, draw, or ask a grown-up to help you share..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="mt-2 min-h-24"
                />
              </div>
            </div>
          </ActivityGuide>
        );

      case 'record_or_text':
        return (
          <ActivityGuide
            title="Story & Memory Time - Sharing From Your Heart"
            activityType="memory"
            introduction="Stories and memories are like precious treasures! Today we're going to share some special memories about the person we love and miss."
            guideMessages={[
              {
                type: 'instruction',
                content: "📖 Hello, beautiful storyteller! I'm so honored to listen to your stories today. Sharing memories is one of the most special things we can do - it keeps love alive in our hearts!"
              },
              {
                type: 'encouragement',
                content: "💝 You know what's amazing? Every story you tell, every memory you share, is a gift. It's a way of saying 'this person was important and I love them.' That's so beautiful!"
              },
              {
                type: 'tip',
                content: "🌟 Stories can be happy, funny, silly, or even a little sad - all feelings are okay here! You can tell about big moments or tiny everyday things. Every memory matters!"
              }
            ]}
            audioInstructions={[
              "Welcome to your special story and memory sharing time",
              "Take a moment to think about someone you love",
              "We're going to share memories with open hearts"
            ]}
          >
            <div className="space-y-6">
              <InteractiveChoices
                title="What Kind of Story Would You Like to Share?"
                description="Choose the type of memory that feels right for you today. There's no pressure - just follow your heart!"
                activityType="memory"
                choices={[
                  {
                    id: 'happy_memory',
                    emoji: '😊',
                    title: 'Happy Memory',
                    description: 'A time that made you smile or laugh',
                    guidance: "Happy memories are like sunshine for our hearts! They remind us of love, joy, and all the good times. These memories show us that even when we miss someone, the happiness they brought us stays with us forever.",
                    followUp: "What made this memory so special and happy? How did it feel to remember this joyful time?"
                  },
                  {
                    id: 'funny_story',
                    emoji: '😂',
                    title: 'Funny Story',
                    description: 'Something silly or funny that happened',
                    guidance: "Funny stories are wonderful! Laughter is like medicine for sad hearts. When we remember funny moments, it reminds us that this person brought joy and silliness into our lives - and that's such a beautiful gift!",
                    followUp: "What was so funny about this moment? Do you still laugh when you think about it?"
                  },
                  {
                    id: 'special_tradition',
                    emoji: '🎈',
                    title: 'Special Tradition',
                    description: 'Something you did together regularly',
                    guidance: "Traditions are so precious! They're like special rituals that only you and this person shared. Whether it was bedtime stories, cooking together, or holiday traditions - these repeated moments of love are treasures!",
                    followUp: "What made this tradition special? Would you like to keep doing it to remember them?"
                  },
                  {
                    id: 'everyday_moment',
                    emoji: '💫',
                    title: 'Everyday Moment',
                    description: 'A simple, ordinary moment that felt special',
                    guidance: "Sometimes the most precious memories are the quiet, everyday ones! Maybe it was the way they made your breakfast, how they said goodnight, or just sitting together. These simple moments are full of love.",
                    followUp: "What made this everyday moment feel special? How did it show their love for you?"
                  },
                  {
                    id: 'what_they_taught_me',
                    emoji: '🌱',
                    title: 'What They Taught Me',
                    description: 'Something important you learned from them',
                    guidance: "The things people teach us are gifts that last forever! It might be how to tie your shoes, how to be kind, or how to be brave. These lessons mean they're still helping you grow, even now.",
                    followUp: "What did they teach you? How do you use what they taught you in your life now?"
                  }
                ]}
                onChoiceSelect={(choiceId) => setSelectedOption(choiceId)}
                onResponseComplete={(choiceId, response) => setUserInput(response)}
              />

              {selectedOption && (
                <div className="space-y-6">
                  <div className="p-4 bg-earth/10 rounded-lg border border-earth/20">
                    <h4 className="font-medium text-earth mb-3 text-center">📱 Choose How to Share Your Story</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Button
                        variant={isRecording ? "destructive" : "earth"}
                        size="lg"
                        onClick={() => setIsRecording(!isRecording)}
                        className="h-16 flex flex-col items-center justify-center"
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="w-5 h-5 mb-1" />
                            <span className="text-sm">Stop Recording</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-5 h-5 mb-1" />
                            <span className="text-sm">Record Your Story</span>
                          </>
                        )}
                      </Button>
                      
                      <div className="flex items-center justify-center p-4 border border-earth/30 rounded-lg">
                        <div className="text-center text-muted-foreground">
                          <Palette className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-sm">Or write/draw below</span>
                        </div>
                      </div>
                    </div>

                    {isRecording && (
                      <div className="p-3 bg-earth/20 rounded-lg text-center animate-pulse">
                        <p className="text-sm text-earth font-medium">
                          🎤 Recording your beautiful story...
                        </p>
                        <p className="text-xs text-earth/80 mt-1">
                          Take your time. Speak from your heart.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-earth mb-2 block flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Write or Draw Your Story Here:
                      </label>
                      <Textarea
                        placeholder="Tell me about this special memory... What happened? Who was there? How did it feel? What do you want to remember most? You can also draw pictures or ask someone to help you write..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="min-h-32 border-earth/30 focus:border-earth/50"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-earth/5 rounded-lg text-center">
                        <Star className="w-4 h-4 text-earth mx-auto mb-1" />
                        <p className="text-xs text-earth">Tell about the people</p>
                      </div>
                      <div className="p-3 bg-earth/5 rounded-lg text-center">
                        <Heart className="w-4 h-4 text-earth mx-auto mb-1" />
                        <p className="text-xs text-earth">Share the feelings</p>
                      </div>
                      <div className="p-3 bg-earth/5 rounded-lg text-center">
                        <Sparkles className="w-4 h-4 text-earth mx-auto mb-1" />
                        <p className="text-xs text-earth">What made it special</p>
                      </div>
                    </div>
                  </div>

                  {userInput.length > 20 && (
                    <Card className="shadow-gentle border-healing/30 bg-gradient-to-r from-healing/10 to-earth/10">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Star className="w-8 h-8 text-healing mx-auto mb-2 fill-current" />
                          <h4 className="font-medium text-healing mb-2">Thank You for Sharing! 💝</h4>
                          <p className="text-sm text-muted-foreground">
                            What a beautiful story! Sharing memories like this is so important. It helps keep love alive and helps your heart heal. 
                            This person would be so happy to know you're remembering them with such love! 🌟
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </ActivityGuide>
        );

      case 'craft':
        return (
          <ActivityGuide
            title={module.title}
            activityType="craft"
            introduction="Let's create something beautiful together! Art helps us express feelings that are hard to put into words."
            guideMessages={[
              {
                type: 'instruction',
                content: "🎨 Today we're making a Memory Star or Heart! This will be a special way to remember someone important to you.",
                icon: '✨'
              },
              {
                type: 'encouragement', 
                content: "There's no right or wrong way to make art. Your feelings and creativity are perfect just as they are!",
                icon: '💖'
              },
              {
                type: 'tip',
                content: "If you feel sad while creating, that's okay! Art can help us feel better. Take breaks if you need them.",
                icon: '🌈'
              },
              {
                type: 'check-in',
                content: "Ready to create something magical? Remember, your grown-up is right here with you!",
                icon: '🌟'
              }
            ]}
            audioInstructions={[
              "Welcome to our special craft time! Today we're going to make something really meaningful together.",
              "Art is like a magic way to show our feelings. Sometimes when words feel too hard, colors and shapes can help us instead.",
              "Remember, this is YOUR art. Make it however feels right to you!"
            ]}
          >
            <div className="space-y-6">
              <InteractiveChoices
                title="What Would You Like to Make?"
                description="Choose what feels right for your heart today"
                activityType="creative"
                choices={[
                  {
                    id: 'memory_star',
                    emoji: '⭐',
                    title: 'Memory Star',
                    description: 'A bright star to hold special memories',
                    guidance: "Stars shine in the dark, just like happy memories can help when we feel sad. Let's make a star that holds your favorite memory!",
                    followUp: "What's a happy memory you'd like to put in your star? You can draw it, write about it, or tell your grown-up about it!"
                  },
                  {
                    id: 'love_heart',
                    emoji: '💖',
                    title: 'Love Heart',
                    description: 'A heart full of love and warm feelings',
                    guidance: "Hearts hold all our love! Even when someone isn't with us anymore, the love stays in our hearts forever.",
                    followUp: "What would you like to put in your love heart? Maybe colors that remind you of someone special, or words that feel warm and happy?"
                  },
                  {
                    id: 'feeling_rainbow',
                    emoji: '🌈',
                    title: 'Feeling Rainbow',
                    description: 'A rainbow showing all your different feelings',
                    guidance: "Rainbows have lots of colors, just like we have lots of different feelings! Every color is important and beautiful.",
                    followUp: "What colors match your feelings today? You can use any colors you want - there's no wrong choice!"
                  }
                ]}
                onChoiceSelect={(choiceId) => setSelectedOption(choiceId)}
                onResponseComplete={(choiceId, response) => setUserInput(response)}
              />

              <GuidedSteps
                activityType="craft"
                steps={[
                  {
                    id: 'gather_supplies',
                    title: 'Gather Your Art Supplies',
                    description: 'Let\'s collect everything we need for our special creation',
                    guidance: 'Look around for paper, crayons, markers, stickers, or anything colorful! You can even use things from nature like leaves or flowers. Ask your grown-up to help you find supplies.',
                    encouragement: 'Great job gathering your supplies! You\'re all ready to create something amazing! 🎨'
                  },
                  {
                    id: 'choose_colors',
                    title: 'Pick Your Special Colors',
                    description: 'Choose colors that feel good to you today',
                    guidance: 'What colors make you feel happy? What colors remind you of someone special? There are no wrong colors - pick the ones that feel right in your heart!',
                    encouragement: 'Beautiful color choices! Your heart knows exactly what it needs today! 💝'
                  },
                  {
                    id: 'start_creating',
                    title: 'Begin Your Art',
                    description: 'Start drawing, coloring, or decorating your shape',
                    guidance: 'You can draw pictures, write words, add stickers, or make patterns! If you want to change something, that\'s perfectly okay. Art is about having fun and expressing yourself.',
                    encouragement: 'Look at you creating! You\'re doing such beautiful work! Keep going! ✨'
                  },
                  {
                    id: 'add_memories',
                    title: 'Add Your Special Memories or Feelings',
                    description: 'Put something meaningful into your art',
                    guidance: 'You can draw a picture of a happy time, write a word that feels important, or add a sticker that makes you smile. You can also just use colors that feel good!',
                    encouragement: 'What a special way to show your feelings! Your art is full of love! 🌟'
                  },
                  {
                    id: 'finishing_touches',
                    title: 'Add Final Magic Touches',
                    description: 'Make your creation extra special',
                    guidance: 'Maybe add some sparkles, draw some hearts, or write your name! You can also add anything else that feels important to you.',
                    encouragement: 'Perfect! Your creation is absolutely wonderful and uniquely yours! 💖'
                  },
                  {
                    id: 'share_creation',
                    title: 'Share Your Beautiful Art',
                    description: 'Show your grown-up what you made',
                    guidance: 'Tell your grown-up about your art! What do you like best about it? How did it feel to make it? Your grown-up will love hearing about your creation!',
                    encouragement: 'You should feel so proud! You created something beautiful and meaningful! 🌈'
                  }
                ]}
                onAllComplete={() => {
                  toast({
                    title: "Amazing Artwork! 🎨",
                    description: "You created something truly beautiful and meaningful!",
                  });
                }}
              />
            </div>
          </ActivityGuide>
        );

      case 'guided_steps':
        return (
          <ActivityGuide
            title="Kitchen Connection - Cooking Together"
            activityType="kitchen"
            introduction="There's something magical about making food together. It helps us connect, share stories, and create sweet memories while we make something delicious!"
            guideMessages={[
              {
                type: 'instruction',
                content: "👨‍🍳 Welcome to our kitchen adventure! Cooking together is one of the most special ways families and friends can connect. Today, we're not just making food - we're making memories!"
              },
              {
                type: 'encouragement',
                content: "💝 You know what's wonderful about cooking? It doesn't have to be perfect! The best part is being together, laughing, maybe making a little mess, and enjoying each other's company."
              },
              {
                type: 'tip',
                content: "🌟 While we cook, this is a perfect time to share stories, talk about your day, or even talk about the person you're remembering. Food has a way of bringing out love and memories!"
              }
            ]}
            audioInstructions={[
              "Welcome to your kitchen connection activity",
              "Take a moment to look around your kitchen space",
              "We're going to cook with love and create memories together"
            ]}
          >
            <div className="space-y-6">
              <InteractiveChoices
                title="Choose Your Recipe Adventure"
                description="Pick something yummy to make together! Think about what sounds fun and tasty."
                activityType="activity"
                choices={[
                  {
                    id: 'fruit_kabobs',
                    emoji: '🍓',
                    title: 'Rainbow Fruit Kabobs',
                    description: 'Colorful, healthy, and fun to assemble',
                    guidance: "Fruit kabobs are perfect! They're healthy, colorful, and everyone can make their own pattern. Plus, you get to eat the rainbow!",
                    followUp: "What fruits do you want to use? What pattern or colors are you excited to make?"
                  },
                  {
                    id: 'mini_pancakes',
                    emoji: '🥞',
                    title: 'Mini Heart Pancakes',
                    description: 'Sweet treats shaped with love',
                    guidance: "Heart-shaped pancakes are so special! Every flip shows love, and decorating them together is pure joy. Perfect for sharing sweet moments!",
                    followUp: "What toppings do you want to add? Berries, whipped cream, honey, or something else special?"
                  },
                  {
                    id: 'sandwich_art',
                    emoji: '🥪',
                    title: 'Creative Sandwich Art',
                    description: 'Turn lunch into edible masterpieces',
                    guidance: "Sandwich art lets you be creative with food! You can make faces, animals, or designs. It's amazing how food can become art!",
                    followUp: "What kind of sandwich art do you want to create? An animal, a face, or maybe something that reminds you of someone special?"
                  },
                  {
                    id: 'smoothie_bowl',
                    emoji: '🍌',
                    title: 'Smoothie Bowl Creation',
                    description: 'Blend, pour, and decorate something delicious',
                    guidance: "Smoothie bowls are like edible canvases! You blend the colors, then decorate the top like an artist. So pretty and so yummy!",
                    followUp: "What colors do you want your smoothie to be? What toppings will make it look amazing?"
                  }
                ]}
                onChoiceSelect={(choiceId) => setSelectedOption(choiceId)}
                onResponseComplete={(choiceId, response) => setUserInput(response)}
              />

              {selectedOption && (
                <GuidedSteps
                  activityType="kitchen"
                  steps={[
                    {
                      id: 'prep',
                      title: 'Kitchen Prep Time',
                      description: 'Get your space and ingredients ready',
                      guidance: "Let's start by washing our hands and gathering everything we need. This is a great time to talk about what we're making and why it's special!",
                      encouragement: "Great prep work! You're setting up for success! 🌟"
                    },
                    {
                      id: 'create_together',
                      title: 'Creating Together',
                      description: 'Take turns, help each other, and have fun',
                      guidance: "Now for the fun part! Take turns with different tasks. Maybe one person can mix while the other adds ingredients. Share the joy!",
                      encouragement: "Beautiful teamwork! You're both doing amazing! 💫"
                    },
                    {
                      id: 'share_stories',
                      title: 'Share & Stories',
                      description: 'Enjoy your creation and share memories',
                      guidance: "While you eat, this is perfect time for stories! Share a memory, talk about your day, or tell each other what you're grateful for.",
                      encouragement: "What wonderful sharing! These moments are the most precious ingredients! ❤️"
                    },
                    {
                      id: 'cleanup_love',
                      title: 'Cleanup with Love',
                      description: 'Tidy up together as a team',
                      guidance: "Cleaning up together is just as important as cooking together! Put on some music, make it fun, and celebrate what you accomplished!",
                      encouragement: "Perfect! A clean kitchen and full hearts - you did amazing work together! ✨"
                    }
                  ]}
                  onAllComplete={() => {
                    toast({
                      title: "Kitchen Connection Complete! 🍳",
                      description: "You created delicious food AND beautiful memories together!",
                    });
                  }}
                />
              )}

              <div className="p-4 bg-nature/10 rounded-lg">
                <h4 className="font-medium text-nature mb-2">Share Your Kitchen Experience</h4>
                <Textarea
                  placeholder="How did cooking together feel? What was your favorite part? What stories did you share? What did your creation taste like?"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="mt-2 min-h-24"
                />
              </div>
            </div>
          </ActivityGuide>
        );

      case 'draw_template':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-healing/10 rounded-lg border border-healing/20">
              <Palette className="w-12 h-12 text-healing mx-auto mb-4" />
              <h3 className="text-lg font-medium text-healing mb-2">Feelings Map</h3>
              <p className="text-muted-foreground">{module.narration}</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-healing/20">
              <div className="w-full h-64 bg-gradient-to-b from-healing/5 to-calm/5 rounded-lg border-2 border-dashed border-healing/30 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Palette className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Draw or describe where you feel different emotions</p>
                  <p className="text-xs mt-1">Head, heart, tummy, hands, feet...</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-healing/10 rounded-lg">
              <h4 className="font-medium text-healing mb-2">Tell us about your feelings</h4>
              <Textarea
                placeholder="Where did you put your feelings? What colors did you use? How do they feel?"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 'ritual_select':
        return (
          <ActivityGuide
            title={module.title}
            activityType="ritual"
            introduction="It's time for our special closing ceremony! Rituals help us say goodbye in a gentle, meaningful way."
            guideMessages={[
              {
                type: 'instruction',
                content: "🌟 We're going to choose a special way to end our time together today. Rituals are like gentle hugs for our hearts when we need to say goodbye.",
                icon: '🤗'
              },
              {
                type: 'encouragement',
                content: "You've done such beautiful, brave work today! This closing ritual is a way to honor all the feelings you've shared and the love in your heart.",
                icon: '💝'
              },
              {
                type: 'tip',
                content: "There's no pressure to say anything special or feel a certain way. Just be yourself and do what feels right in your heart.",
                icon: '💙'
              },
              {
                type: 'check-in',
                content: "Ready to choose how we'd like to close our special time together? Each choice is beautiful and meaningful!",
                icon: '✨'
              }
            ]}
            audioInstructions={[
              "Welcome to our closing ceremony time. This is a very special moment where we take all the love and learning from today and keep it safe in our hearts.",
              "Rituals are like special ceremonies that help us mark important moments. They can be simple and gentle, just like us.",
              "Whatever you choose will be perfect, because it comes from your heart!"
            ]}
          >
            <div className="space-y-6">
              <InteractiveChoices
                title="How Would You Like to Say Goodbye Today?"
                description="Choose the ceremony that feels right in your heart"
                activityType="memory"
                choices={[
                  {
                    id: 'candle_light',
                    emoji: '🕯️',
                    title: 'Light a Candle',
                    description: 'Light a special candle and watch it glow',
                    guidance: "Candles are like little lights of love and memory. When we light a candle, it's like sending warm thoughts to someone special or keeping love glowing in our hearts.",
                    followUp: "What would you like to think about while we watch the candle? Maybe a happy memory, or just the warm love in your heart?"
                  },
                  {
                    id: 'plant_seed',
                    emoji: '🌱',
                    title: 'Plant a Seed',
                    description: 'Plant a seed that will grow into something beautiful',
                    guidance: "Seeds are amazing! They start small but grow into beautiful plants. Just like how love grows in our hearts, even when we're sad. This seed will be a reminder of your brave heart!",
                    followUp: "What do you hope this little seed will become? What would you like to tell it as we plant it together?"
                  },
                  {
                    id: 'wish_balloon',
                    emoji: '🎈',
                    title: 'Send a Wish Balloon',
                    description: 'Release a balloon with your special wish or message',
                    guidance: "Balloons can carry our wishes and messages high up into the sky! It's like sending a gentle hug or happy thought out into the world where it can float freely.",
                    followUp: "What wish or message would you like to send with your balloon? It can be anything that feels important to you!"
                  },
                  {
                    id: 'memory_stone',
                    emoji: '🪨',
                    title: 'Choose a Memory Stone',
                    description: 'Find a special stone to keep your memories safe',
                    guidance: "Stones are strong and last a long time, just like the love in our hearts! We can find a special stone that will hold our memories and feelings safe forever.",
                    followUp: "What would you like your special stone to remember? What feelings would you like it to hold for you?"
                  },
                  {
                    id: 'gratitude_circle',
                    emoji: '🙏',
                    title: 'Make a Gratitude Circle',
                    description: 'Share what we\'re thankful for from our time together',
                    guidance: "Gratitude means thinking about the good things, even when we feel sad. We can sit in a circle and share what we're thankful for from our time together today.",
                    followUp: "What are you thankful for today? Maybe something you learned, or how brave you were, or just having your grown-up with you?"
                  }
                ]}
                onChoiceSelect={(choiceId) => setSelectedOption(choiceId)}
                onResponseComplete={(choiceId, response) => setUserInput(response)}
              />

              <GuidedSteps
                activityType="ritual"
                steps={[
                  {
                    id: 'prepare_space',
                    title: 'Create Our Sacred Space',
                    description: 'Make our space feel special and peaceful',
                    guidance: 'Find a quiet, comfortable spot where you and your grown-up can sit together. Maybe dim the lights a little, or just find a cozy corner. This is your special ceremony space!',
                    encouragement: 'Perfect! You\'ve created such a peaceful, sacred space for your ceremony! 🌟'
                  },
                  {
                    id: 'quiet_moment',
                    title: 'Take a Quiet Moment Together',
                    description: 'Sit quietly and feel the love between you',
                    guidance: 'Sit close to your grown-up and just be quiet together for a moment. Feel how much love there is between you. You can hold hands, hug, or just sit peacefully side by side.',
                    encouragement: 'Beautiful! You can feel how much love and safety there is between you and your grown-up! 💝'
                  },
                  {
                    id: 'perform_ritual',
                    title: 'Do Your Special Ceremony',
                    description: 'Carry out the ritual you chose with care and love',
                    guidance: 'Now it\'s time for your special ceremony! Take your time, there\'s no rush. Let your grown-up help you, and do everything with gentle care and love.',
                    encouragement: 'You\'re doing this so beautifully! Your ceremony is filled with love and meaning! ✨'
                  },
                  {
                    id: 'share_feelings',
                    title: 'Share How You\'re Feeling',
                    description: 'Tell your grown-up how the ceremony felt',
                    guidance: 'How did that feel? Was it peaceful? Special? Different than you expected? You can tell your grown-up anything about how it felt, or just sit quietly if you prefer.',
                    encouragement: 'Thank you for sharing your feelings! Your thoughts and feelings are so important! 🤗'
                  },
                  {
                    id: 'make_promise',
                    title: 'Make a Gentle Promise',
                    description: 'Promise to take care of yourself and your feelings',
                    guidance: 'You can make a gentle promise to yourself and your grown-up. Maybe to remember that you\'re loved, or to ask for help when you need it, or to be kind to yourself.',
                    encouragement: 'What a beautiful promise! You\'re learning to take such good care of yourself! 💖'
                  },
                  {
                    id: 'closing_hug',
                    title: 'Share a Special Closing Hug',
                    description: 'End with a warm, loving hug together',
                    guidance: 'Give your grown-up a big, warm hug! Hold each other close and feel all the love. This hug is like wrapping up all the good feelings from today and keeping them safe in your hearts.',
                    encouragement: 'What a perfect way to end! You\'ve been so brave, so loving, and so wonderful today! You should feel very proud! 🌈'
                  }
                ]}
                onAllComplete={() => {
                  toast({
                    title: "Beautiful Closing Ceremony! 🌟",
                    description: "What a special way to end your time together with love and meaning!",
                  });
                }}
              />
            </div>
          </ActivityGuide>
        );

      default:
        return (
          <div className="text-center p-6 bg-muted/10 rounded-lg">
            <p className="text-muted-foreground">Activity content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="shadow-nurturing">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-accent/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <CardTitle className="text-healing">{module.title}</CardTitle>
              <CardDescription>
                <Badge variant="outline" className="mr-2 capitalize border-healing/30 text-healing bg-healing/10">
                  {module.type.replace('_', ' ')}
                </Badge>
                Activity for children and caregivers
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Caregiver Tip */}
      <Card className="shadow-gentle border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-accent-foreground mb-1">For Caregivers</h4>
              <p className="text-sm text-accent-foreground/80">{module.caregiverTip}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Content */}
      <Card className="shadow-nurturing">
        <CardContent className="p-6">
          {renderActivityContent()}
        </CardContent>
      </Card>

      {/* Complete Button */}
      <Card className="shadow-gentle">
        <CardContent className="p-4 text-center">
          <Button
            variant="healing"
            size="lg"
            onClick={handleComplete}
            disabled={isCompleted}
            className="min-w-[200px]"
          >
            {isCompleted ? (
              <>
                <Star className="w-4 h-4 mr-2 fill-current" />
                Completed! ⭐
              </>
            ) : (
              <>
                <Star className="w-4 h-4 mr-2" />
                Mark as Complete
              </>
            )}
          </Button>
          
          {isCompleted && (
            <p className="text-sm text-muted-foreground mt-2">
              Great job! You can always come back to this activity later.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildActivityModule;