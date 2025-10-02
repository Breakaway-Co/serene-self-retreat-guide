import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle, PlayCircle, BookOpen, Heart, Brain, Leaf, Shield, Volume2, Save, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActivityStep {
  step: number;
  instruction: string;
  duration: string;
  tip?: string;
}

interface ActivityGuide {
  id: string;
  name: string;
  type: string;
  description: string;
  evidenceBasis: string;
  traumaInformed: string;
  benefits: string[];
  steps: ActivityStep[];
  modifications: string[];
  safetyNotes: string[];
}

import AudioGuidance from "./AudioGuidance";
import ActivityResponse from "./ActivityResponse";

const ActivityGuides = ({ selectedActivity, onBack }: { selectedActivity: string, onBack: () => void }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showResponses, setShowResponses] = useState(false);
  const { toast } = useToast();

  const activityGuides: Record<string, ActivityGuide> = {
    // Life Upgrade Retreat Guides
    "welcome_grounding": {
      id: "welcome_grounding",
      name: "Welcome & Grounding Ritual",
      type: "mindfulness",
      description: "A gentle breathing and body scan practice to arrive fully present and grounded",
      evidenceBasis: "Combines evidence-based mindfulness meditation (MBSR) with somatic awareness practices",
      traumaInformed: "Emphasizes choice, control, and gentle awareness without forcing",
      benefits: ["Activates present-moment awareness", "Reduces anticipatory anxiety", "Grounds you in your body", "Sets intention for the journey"],
      steps: [
        { step: 1, instruction: "Find a comfortable seated position. Close your eyes or soften your gaze.", duration: "1 min", tip: "Notice where your body contacts the chair or floor" },
        { step: 2, instruction: "Take three deep breaths, exhaling with a gentle sigh.", duration: "1 min", tip: "The sigh activates the vagus nerve for relaxation" },
        { step: 3, instruction: "Scan your body from head to toe, noticing without changing anything.", duration: "5 min", tip: "Just observe - no need to relax or fix anything" },
        { step: 4, instruction: "Place your hands on your heart and belly. Feel the warmth.", duration: "3 min", tip: "This self-touch activates self-compassion circuits" },
        { step: 5, instruction: "Set an intention: 'I am here for my healing and growth.'", duration: "2 min" },
        { step: 6, instruction: "Return to natural breathing and gently open your eyes.", duration: "1 min" }
      ],
      modifications: ["Can be done lying down", "Use guided audio if preferred", "Shorten to 5 minutes if needed"],
      safetyNotes: ["Stop if you feel dissociated or overwhelmed", "Eyes can stay open if closing them feels unsafe"]
    },
    "life_upgrade_intro": {
      id: "life_upgrade_intro",
      name: "Introduction to Life Upgrade Process",
      type: "therapy",
      description: "Understanding the 6 steps: Awareness, Acceptance, Release, Choose, Integrate, Embody",
      evidenceBasis: "Integrates CBT, ACT, and neuroscience principles of belief change",
      traumaInformed: "Emphasizes self-pacing and non-judgment throughout",
      benefits: ["Understand the transformation process", "Learn sustainable change methods", "Build hope and motivation", "Create a roadmap for growth"],
      steps: [
        { step: 1, instruction: "Read or listen to overview of the 6-step process", duration: "10 min" },
        { step: 2, instruction: "Step 1 - Awareness: Notice limiting beliefs without judgment", duration: "3 min", tip: "Just observing creates distance from beliefs" },
        { step: 3, instruction: "Step 2 - Acceptance: Meet yourself with compassion where you are", duration: "3 min", tip: "Acceptance doesn't mean giving up - it means starting truthfully" },
        { step: 4, instruction: "Step 3 - Release: Let go of beliefs that no longer serve you", duration: "3 min" },
        { step: 5, instruction: "Step 4 - Choose: Select new, empowering beliefs", duration: "3 min" },
        { step: 6, instruction: "Step 5 - Integrate: Practice and embody new beliefs", duration: "3 min" },
        { step: 7, instruction: "Step 6 - Embody: Live from your new truth", duration: "3 min" },
        { step: 8, instruction: "Reflect on which step feels most relevant today", duration: "2 min" }
      ],
      modifications: ["Take notes in a journal", "Discuss with a support person", "Revisit this guide anytime"],
      safetyNotes: ["This is a framework, not a rigid path", "You may cycle through steps multiple times"]
    },
    "belief_inventory": {
      id: "belief_inventory",
      name: "Belief Inventory Journal",
      type: "reflection",
      description: "Identify current beliefs about self, relationships, success, and worthiness",
      evidenceBasis: "Based on cognitive therapy core belief identification techniques",
      traumaInformed: "Non-judgmental exploration with self-compassion",
      benefits: ["Gain clarity on underlying beliefs", "Identify patterns", "Understand belief origins", "Create baseline for transformation"],
      steps: [
        { step: 1, instruction: "Set up your journal with four categories: Self, Relationships, Success, Worthiness", duration: "2 min" },
        { step: 2, instruction: "For each category, write: 'I believe...' and complete the sentence 5 times", duration: "15 min", tip: "Write quickly without censoring" },
        { step: 3, instruction: "Circle the beliefs that feel most charged or powerful", duration: "3 min" },
        { step: 4, instruction: "For each circled belief, ask: Where did this come from?", duration: "5 min" },
        { step: 5, instruction: "Ask: How has this belief served me? How has it limited me?", duration: "5 min", tip: "Beliefs often have both protective and limiting aspects" }
      ],
      modifications: ["Voice record instead of writing", "Start with just one category", "Use prompts if stuck"],
      safetyNotes: ["This may bring up emotions - that's normal", "Take breaks as needed", "You don't need to fix or change anything today"]
    },
    "step1_awareness": {
      id: "step1_awareness",
      name: "Step 1: Awareness Practice",
      type: "therapy",
      description: "Guided exploration of how beliefs show up in daily life through observation without judgment",
      evidenceBasis: "Mindful awareness combined with cognitive observation techniques",
      traumaInformed: "Gentle noticing without shame or judgment",
      benefits: ["Develop observer mind", "See beliefs as thoughts, not facts", "Reduce automatic reactions", "Build self-understanding"],
      steps: [
        { step: 1, instruction: "Sit comfortably with your journal", duration: "1 min" },
        { step: 2, instruction: "Think of a recent challenging situation", duration: "3 min", tip: "Choose something mildly difficult, not overwhelming" },
        { step: 3, instruction: "What thoughts arose? What beliefs were underneath?", duration: "10 min", tip: "Example: 'I made a mistake' → belief: 'I'm not good enough'" },
        { step: 4, instruction: "Notice how these beliefs felt in your body", duration: "5 min" },
        { step: 5, instruction: "Practice saying: 'I'm having the thought that...' before each belief", duration: "5 min", tip: "This creates psychological distance" },
        { step: 6, instruction: "Write: 'This belief is a pattern, not the truth about who I am'", duration: "3 min" }
      ],
      modifications: ["Start with very small situations", "Use prompts like 'I noticed...'", "Draw or map beliefs visually"],
      safetyNotes: ["Stay with mild-moderate situations", "Ground yourself if overwhelmed", "Remember: awareness is the first step, not the whole journey"]
    },
    "eft_basics": {
      id: "eft_basics",
      name: "EFT Tapping Introduction",
      type: "healing",
      description: "Learn basic tapping points and sequence for emotional regulation",
      evidenceBasis: "EFT (Emotional Freedom Technique) shows efficacy in reducing anxiety, stress, and trauma symptoms",
      traumaInformed: "Self-paced, can be stopped anytime, emphasizes choice",
      benefits: ["Reduces emotional intensity", "Regulates nervous system", "Provides portable self-soothing tool", "Addresses beliefs somatically"],
      steps: [
        { step: 1, instruction: "Learn the 8 tapping points: top of head, eyebrow, side of eye, under eye, under nose, chin, collarbone, under arm", duration: "5 min" },
        { step: 2, instruction: "Rate your stress level 0-10", duration: "1 min" },
        { step: 3, instruction: "Setup statement: Tap karate chop point while saying 'Even though [problem], I deeply and completely accept myself' (3x)", duration: "2 min" },
        { step: 4, instruction: "Tap each point 5-7 times while repeating a reminder phrase about the problem", duration: "7 min", tip: "Example: 'This anxiety' or 'This belief'" },
        { step: 5, instruction: "Take a deep breath and rate your stress again 0-10", duration: "2 min" },
        { step: 6, instruction: "Repeat rounds until stress reduces to 3 or below", duration: "10 min" }
      ],
      modifications: ["Tap gently or even just touch points", "Silently think phrases if speaking feels uncomfortable", "Focus on breath if tapping feels too activating"],
      safetyNotes: ["Stop if emotions escalate beyond your window of tolerance", "EFT can bring up emotions - this is normal", "Work with a practitioner for trauma-focused tapping"]
    },
    "self_compassion_meditation": {
      id: "self_compassion_meditation",
      name: "Self-Compassion Meditation",
      type: "mindfulness",
      description: "Guided meditation to cultivate kindness toward yourself",
      evidenceBasis: "Based on Kristin Neff's self-compassion research showing benefits for mental health and well-being",
      traumaInformed: "Gentle, optional touch, emphasizes self-kindness over self-criticism",
      benefits: ["Reduces self-criticism", "Increases emotional resilience", "Activates care-giving circuits", "Builds secure internal relationship"],
      steps: [
        { step: 1, instruction: "Sit comfortably and place your hands on your heart", duration: "1 min", tip: "Feel the warmth and gentle pressure" },
        { step: 2, instruction: "Think of yourself struggling with something", duration: "2 min", tip: "Start with something mild, not your deepest wound" },
        { step: 3, instruction: "Say silently: 'This is a moment of suffering'", duration: "1 min", tip: "Mindfulness: acknowledging the difficulty" },
        { step: 4, instruction: "Say: 'Suffering is a part of life' or 'Others feel this too'", duration: "2 min", tip: "Common humanity: you're not alone" },
        { step: 5, instruction: "Say: 'May I be kind to myself' and 'May I give myself the compassion I need'", duration: "3 min", tip: "Self-kindness: offering yourself care" },
        { step: 6, instruction: "Breathe naturally, hands on heart, for several minutes", duration: "5 min" },
        { step: 7, instruction: "Imagine sending yourself loving energy with each breath", duration: "3 min" }
      ],
      modifications: ["Use different hand placement if heart feels too vulnerable", "Shorten to 5 minutes", "Write the phrases in your journal"],
      safetyNotes: ["Stop if you feel flooded with emotion", "It's okay if this feels awkward at first", "Self-compassion is a skill that builds over time"]
    },
    // Wisdom Development Retreat Guides
    "arrival_meditation": {
      id: "arrival_meditation",
      name: "Arrival & Centering Meditation",
      type: "mindfulness",
      description: "Silent meditation to arrive in present moment awareness",
      evidenceBasis: "Based on MBSR (Mindfulness-Based Stress Reduction) protocols",
      traumaInformed: "Gentle arrival practice with choice and control",
      benefits: ["Present-moment awareness", "Nervous system calming", "Inner stillness", "Mental clarity"],
      steps: [
        { step: 1, instruction: "Find a comfortable seated position with spine gently upright", duration: "1 min" },
        { step: 2, instruction: "Close your eyes or lower your gaze softly", duration: "30 sec", tip: "Choose what feels safest" },
        { step: 3, instruction: "Take three intentional breaths, exhaling fully", duration: "1 min" },
        { step: 4, instruction: "Allow your breath to return to its natural rhythm", duration: "2 min" },
        { step: 5, instruction: "Notice sensations in your body without changing them", duration: "5 min", tip: "Just observe - feet on floor, seat on chair, breath moving" },
        { step: 6, instruction: "When thoughts arise, gently return to the breath", duration: "8 min", tip: "This is the practice - returning, not perfect stillness" },
        { step: 7, instruction: "Slowly deepen your breath and gently open your eyes", duration: "1 min" }
      ],
      modifications: ["Can be done lying down", "Use shorter periods", "Add gentle music"],
      safetyNotes: ["Normal to have many thoughts", "Can open eyes anytime", "No right or wrong experience"]
    },
    "the_method_intro": {
      id: "the_method_intro",
      name: "Introduction to The Method",
      type: "therapy",
      description: "Understanding The Method: Pause, Notice, Feel, Ask, Listen, Trust",
      evidenceBasis: "Integrates mindfulness, somatic awareness, and intuitive intelligence research",
      traumaInformed: "Self-paced exploration with emphasis on body wisdom",
      benefits: ["Learn six-step wisdom access process", "Develop inner guidance system", "Build self-trust", "Access intuition reliably"],
      steps: [
        { step: 1, instruction: "Read overview: The Method helps you access your inner wisdom in six steps", duration: "3 min" },
        { step: 2, instruction: "PAUSE: Learn to create space before reacting", duration: "5 min", tip: "Even a micro-pause changes outcomes" },
        { step: 3, instruction: "NOTICE: Develop neutral observation of thoughts, feelings, sensations", duration: "5 min" },
        { step: 4, instruction: "FEEL: Drop into body sensations and emotional awareness", duration: "5 min", tip: "Wisdom speaks through the body" },
        { step: 5, instruction: "ASK: Pose clear questions to your inner wisdom", duration: "5 min" },
        { step: 6, instruction: "LISTEN: Receive answers without forcing or editing", duration: "5 min", tip: "First thought is often wisest" },
        { step: 7, instruction: "TRUST: Act on your inner knowing", duration: "5 min" }
      ],
      modifications: ["Journal each step", "Practice with low-stakes decisions first", "Revisit this guide often"],
      safetyNotes: ["Start with small decisions", "Trust builds over time", "Professional guidance for major life decisions"]
    },
    "body_wisdom_scan": {
      id: "body_wisdom_scan",
      name: "Body Wisdom Scanning",
      type: "somatic",
      description: "Learning to read body signals and sensations as wisdom",
      evidenceBasis: "Based on somatic experiencing and interoception research",
      traumaInformed: "Gentle body awareness with choice to disconnect if needed",
      benefits: ["Develop interoceptive awareness", "Access body-based wisdom", "Recognize early signals", "Trust physical sensations"],
      steps: [
        { step: 1, instruction: "Lie down or sit comfortably", duration: "1 min" },
        { step: 2, instruction: "Scan head: notice any sensations without judgment", duration: "2 min", tip: "Tingling, warmth, coolness, tightness, ease" },
        { step: 3, instruction: "Scan throat and chest: notice communication and heart sensations", duration: "3 min", tip: "These areas hold emotional wisdom" },
        { step: 4, instruction: "Scan belly/gut: notice your 'gut feelings'", duration: "3 min", tip: "The gut has more neurons than the spinal cord" },
        { step: 5, instruction: "Ask your body: 'What are you trying to tell me?'", duration: "4 min" },
        { step: 6, instruction: "Listen without forcing - notice any images, words, or knowings that arise", duration: "5 min" },
        { step: 7, instruction: "Thank your body for its wisdom", duration: "1 min" }
      ],
      modifications: ["Focus on just one area", "Keep eyes open", "Use guided audio"],
      safetyNotes: ["Can disconnect from uncomfortable areas", "Body sensations are information, not commands", "Build tolerance gradually"]
    },
    "method_pause": {
      id: "method_pause",
      name: "The Method Practice: Pause",
      type: "mindfulness",
      description: "Learning the art of the pause before response",
      evidenceBasis: "Based on Viktor Frankl's stimulus-response gap and mindfulness research",
      traumaInformed: "Creates choice and agency in moments of reactivity",
      benefits: ["Reduces impulsive reactions", "Creates space for wisdom", "Interrupts automatic patterns", "Builds emotional regulation"],
      steps: [
        { step: 1, instruction: "Think of a situation where you typically react quickly", duration: "2 min" },
        { step: 2, instruction: "Visualize that situation arising again", duration: "2 min" },
        { step: 3, instruction: "Practice pausing: Take one full breath before responding", duration: "5 min", tip: "Count: 1...2...3...4 in, 1...2...3...4 out" },
        { step: 4, instruction: "In the pause, notice: What am I feeling? What do I need?", duration: "5 min" },
        { step: 5, instruction: "Repeat with different scenarios", duration: "10 min" },
        { step: 6, instruction: "Set intention: 'I will practice pausing today'", duration: "2 min" }
      ],
      modifications: ["Start with low-stress situations", "Use physical anchor like touching thumb to finger", "Practice pausing even when not triggered"],
      safetyNotes: ["The pause is permission, not perfection", "You won't remember every time - that's normal", "Small pauses create big changes over time"]
    },
    "awareness_meditation": {
      id: "awareness_meditation",
      name: "Awareness Meditation",
      type: "mindfulness",
      description: "Open awareness practice without focusing on any particular object",
      evidenceBasis: "Based on Vipassana and open monitoring meditation traditions",
      traumaInformed: "Allows thoughts and feelings to arise and pass without force",
      benefits: ["Develops metacognition", "Reduces identification with thoughts", "Builds equanimity", "Expands consciousness"],
      steps: [
        { step: 1, instruction: "Sit comfortably with eyes closed or soft gaze", duration: "1 min" },
        { step: 2, instruction: "Take several grounding breaths", duration: "2 min" },
        { step: 3, instruction: "Open your awareness like a wide sky", duration: "3 min", tip: "Notice whatever arises without focusing on anything in particular" },
        { step: 4, instruction: "Notice thoughts, sensations, sounds, emotions - let them arise and pass", duration: "10 min" },
        { step: 5, instruction: "If you get caught in a thought, gently expand back to open awareness", duration: "7 min" },
        { step: 6, instruction: "Rest in the spaciousness of awareness itself", duration: "3 min" }
      ],
      modifications: ["Start with shorter periods", "Use breath as anchor if awareness feels too open", "Practice with eyes open looking at nature"],
      safetyNotes: ["Can be destabilizing if you're not ready - that's okay", "Return to focused attention if needed", "This practice deepens over time"]
    },
    "gentle-wake-up-breathing": {
      id: "gentle-wake-up-breathing",
      name: "Clinical Breathwork Protocol",
      type: "somatic-intervention",
      description: "Evidence-based respiratory intervention utilizing diaphragmatic breathing techniques to regulate autonomic nervous system function and establish neurological stability",
      evidenceBasis: "Grounded in Polyvagal Theory (Porges, 2011) and pranayama research. Clinical studies demonstrate controlled breathing activates parasympathetic nervous system, reduces HPA axis hyperactivation, and promotes prefrontal cortex regulation of limbic responses",
      traumaInformed: "Uses gentle, non-forceful breathing patterns that allow for personal control and can be stopped at any time",
      benefits: [
        "Activates parasympathetic nervous system",
        "Reduces morning anxiety",
        "Increases oxygen flow to the brain",
        "Promotes mindful awareness"
      ],
      steps: [
        {
          step: 1,
          instruction: "Remain lying down in bed. Place one hand on your chest, one on your belly.",
          duration: "30 seconds",
          tip: "Notice which hand moves more naturally - there's no wrong way"
        },
        {
          step: 2,
          instruction: "Without forcing anything, take a natural breath in through your nose.",
          duration: "4 seconds",
          tip: "If nose breathing feels restricted, mouth breathing is perfectly fine"
        },
        {
          step: 3,
          instruction: "Pause naturally at the top of your breath.",
          duration: "1-2 seconds",
          tip: "Don't hold your breath forcefully - just a gentle pause"
        },
        {
          step: 4,
          instruction: "Exhale slowly through your mouth with a gentle 'ahh' sound.",
          duration: "6 seconds",
          tip: "The sound helps release tension and signals safety to your nervous system"
        },
        {
          step: 5,
          instruction: "Repeat this pattern 5-10 times, noticing how your body feels.",
          duration: "3-6 minutes",
          tip: "Stop if you feel dizzy or uncomfortable - your comfort is the priority"
        },
        {
          step: 6,
          instruction: "End by taking three normal breaths and gently wiggling your fingers and toes.",
          duration: "30 seconds",
          tip: "This helps you reconnect with your body before getting up"
        }
      ],
      modifications: [
        "If lying down triggers trauma responses, try sitting up in bed",
        "Use counted breathing (4-4-4-4) if timing feels too restrictive",
        "Replace hand placement with just focusing on the sensation of breath",
        "Breathe through mouth if nasal breathing causes anxiety"
      ],
      safetyNotes: [
        "Stop immediately if you feel dizzy, panicked, or disconnected",
        "This should feel gentle and natural, never forced",
        "If breathing exercises trigger trauma responses, try focusing on external sounds instead",
        "Remember: You're in control and can modify or stop at any time"
      ]
    },
    "gratitude-journaling": {
      id: "gratitude-journaling",
      name: "Structured Gratitude Intervention",
      type: "cognitive-behavioral",
      description: "Clinical journaling protocol designed to restructure maladaptive cognitive patterns and enhance neuroplasticity through positive psychology interventions",
      evidenceBasis: "Supported by neuroscience research demonstrating gratitude practices increase dopamine and serotonin production, enhance prefrontal cortex function, and create measurable changes in brain structure associated with improved emotional regulation and resilience (Emmons & McCullough, 2003; Kini et al., 2016)",
      traumaInformed: "Focuses on small, accessible positives rather than forcing gratitude for traumatic experiences",
      benefits: [
        "Rewires brain for positivity bias",
        "Reduces symptoms of depression",
        "Improves sleep quality",
        "Strengthens social connections"
      ],
      steps: [
        {
          step: 1,
          instruction: "Find a comfortable seated position with your journal or paper.",
          duration: "1 minute",
          tip: "Use whatever feels comfortable - bed, chair, or floor"
        },
        {
          step: 2,
          instruction: "Write today's date and take three conscious breaths.",
          duration: "1 minute",
          tip: "The date helps track patterns in your gratitude over time"
        },
        {
          step: 3,
          instruction: "Write: 'Three things I'm grateful for today:' and number 1-3.",
          duration: "30 seconds"
        },
        {
          step: 4,
          instruction: "For each item, write one specific thing you appreciate and WHY.",
          duration: "8 minutes",
          tip: "Examples: 'My morning coffee - because it tastes warm and comforting' rather than just 'coffee'"
        },
        {
          step: 5,
          instruction: "Write one thing about yourself you appreciate today.",
          duration: "3 minutes",
          tip: "Can be as simple as 'I got out of bed' or 'I'm trying to heal'"
        },
        {
          step: 6,
          instruction: "Close by writing: 'I am open to noticing more good things today.'",
          duration: "1 minute",
          tip: "This sets an intention for continued positive awareness"
        }
      ],
      modifications: [
        "If writing is difficult, try voice recording or mental listing",
        "Start with just one thing if three feels overwhelming",
        "Focus on sensory details (sounds, textures, tastes) if emotions feel inaccessible",
        "Use prompts like 'Something that made me smile' or 'A person who cares about me'"
      ],
      safetyNotes: [
        "Never force gratitude for traumatic experiences",
        "It's okay if some days feel harder - that's normal",
        "Focus on small, concrete things rather than big life events",
        "If this brings up painful contrasts, try 'neutral observations' instead"
      ]
    },
    "emotion-regulation-techniques": {
      id: "emotion-regulation-techniques",
      name: "Clinical Emotion Regulation Protocol",
      type: "dialectical-behavioral-therapy",
      description: "Advanced DBT-based emotion regulation strategies utilizing distress tolerance and mindfulness techniques for sustainable emotional stability",
      evidenceBasis: "Based on comprehensive Dialectical Behavior Therapy (DBT) emotion regulation modules with demonstrated efficacy in treating complex trauma, borderline personality disorder, and severe emotional dysregulation (Linehan, 2014; Koons et al., 2001)",
      traumaInformed: "Emphasizes self-compassion and validates all emotions as normal responses",
      benefits: [
        "Increases emotional intelligence",
        "Reduces emotional reactivity",
        "Builds distress tolerance",
        "Improves relationship skills"
      ],
      steps: [
        {
          step: 1,
          instruction: "Name the emotion you're feeling right now without judgment.",
          duration: "2 minutes",
          tip: "Use emotion words like 'angry,' 'sad,' 'anxious' rather than 'bad' or 'upset'"
        },
        {
          step: 2,
          instruction: "Rate the intensity of this emotion on a scale of 1-10.",
          duration: "1 minute",
          tip: "This helps create distance between you and the emotion"
        },
        {
          step: 3,
          instruction: "Locate where you feel this emotion in your body.",
          duration: "2 minutes",
          tip: "Notice tension, heat, cold, heaviness, or other physical sensations"
        },
        {
          step: 4,
          instruction: "Practice the TIPP technique: Temperature (cold water), Intense exercise (30 seconds), Paced breathing, Paired muscle relaxation.",
          duration: "5 minutes",
          tip: "Choose one TIPP technique that feels most accessible right now"
        },
        {
          step: 5,
          instruction: "Use opposite action: If angry, be gentle. If sad, do something active. If anxious, approach rather than avoid.",
          duration: "5 minutes",
          tip: "This works by changing your body chemistry and breaking emotion-behavior cycles"
        },
        {
          step: 6,
          instruction: "Practice self-validation: 'This emotion makes sense given my situation.'",
          duration: "2 minutes",
          tip: "Validation reduces the intensity of emotions without changing the situation"
        },
        {
          step: 7,
          instruction: "Rate your emotion intensity again and notice any changes.",
          duration: "1 minute",
          tip: "Even small decreases are meaningful progress"
        }
      ],
      modifications: [
        "If naming emotions is difficult, use the emotion wheel or list",
        "Start with rating physical sensations if emotions feel too abstract",
        "Use shorter time intervals if attention is limited",
        "Focus on just one TIPP technique that feels safest"
      ],
      safetyNotes: [
        "Never use opposite action for appropriate emotions (like grief or fear in dangerous situations)",
        "If emotions become overwhelming, focus on grounding techniques instead",
        "Remember that all emotions are valid and temporary",
        "Stop if you experience suicidal or self-harm thoughts - seek professional help"
      ]
    },
    "grounding-exercises-outdoors": {
      id: "grounding-exercises-outdoors",
      name: "Grounding Exercises Outdoors",
      type: "nature",
      description: "Nature-based grounding techniques that use outdoor environments for healing and regulation",
      evidenceBasis: "Based on research showing nature exposure reduces cortisol and improves mental health (Bratman et al., 2019)",
      traumaInformed: "Uses the regulating effects of nature while maintaining awareness of safety and choice",
      benefits: [
        "Reduces stress hormones",
        "Improves focus and attention",
        "Connects you to the present moment",
        "Provides natural dopamine boost"
      ],
      steps: [
        {
          step: 1,
          instruction: "Find a safe outdoor space - yard, park, balcony, or even by an open window.",
          duration: "2 minutes",
          tip: "Any access to nature counts, even urban green spaces"
        },
        {
          step: 2,
          instruction: "Stand or sit comfortably and take three natural breaths of fresh air.",
          duration: "1 minute",
          tip: "Notice how outdoor air feels different from indoor air"
        },
        {
          step: 3,
          instruction: "Use the 5-4-3-2-1 technique: Notice 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.",
          duration: "5 minutes",
          tip: "Focus on natural elements - birds, wind, sunlight, earth smells"
        },
        {
          step: 4,
          instruction: "Find something in nature to focus on - a tree, cloud, flower, or patch of grass.",
          duration: "3 minutes",
          tip: "Let your eyes rest on this natural object without trying to analyze or name it"
        },
        {
          step: 5,
          instruction: "If possible, make physical contact with nature - touch a tree, hold a leaf, or feel the ground.",
          duration: "2 minutes",
          tip: "This creates a literal grounding connection with the earth"
        },
        {
          step: 6,
          instruction: "Practice 'nature breathing' - breathe in for 4 counts, hold for 4, exhale for 6.",
          duration: "5 minutes",
          tip: "Imagine breathing in the life energy of plants around you"
        },
        {
          step: 7,
          instruction: "Set an intention to carry this peaceful feeling with you as you go inside.",
          duration: "2 minutes",
          tip: "This helps maintain the benefits of nature connection throughout your day"
        }
      ],
      modifications: [
        "If going outside isn't possible, practice by an open window or with houseplants",
        "Use nature sounds or videos if no outdoor access is available",
        "Start with just 5 minutes if longer periods feel overwhelming",
        "Adapt for seasonal weather by dressing appropriately or finding covered spaces"
      ],
      safetyNotes: [
        "Choose safe, familiar outdoor spaces",
        "If you have nature phobias, start very gradually",
        "Be aware of weather conditions and dress appropriately",
        "Trust your instincts about safe vs. unsafe outdoor spaces"
      ]
    },
    "creative-expression": {
      id: "creative-expression",
      name: "Creative Expression (Art/Music)",
      type: "creative",
      description: "Therapeutic creative activities that support emotional processing and self-expression",
      evidenceBasis: "Art and music therapy show significant benefits for trauma recovery and emotional regulation (Malchiodi, 2020)",
      traumaInformed: "Emphasizes process over product and allows for non-verbal emotional expression",
      benefits: [
        "Provides outlet for emotions",
        "Accesses non-verbal parts of brain",
        "Builds self-esteem and mastery",
        "Creates meaning from difficult experiences"
      ],
      steps: [
        {
          step: 1,
          instruction: "Gather simple materials: paper, pencils, crayons, or access to music/singing.",
          duration: "2 minutes",
          tip: "Use whatever is available - even drawing in dirt or singing in the shower counts"
        },
        {
          step: 2,
          instruction: "Set an intention: 'I'm creating to express, not to impress.'",
          duration: "1 minute",
          tip: "This removes pressure and judgment from the creative process"
        },
        {
          step: 3,
          instruction: "Check in with your emotions and choose how to express them creatively.",
          duration: "2 minutes",
          tip: "Anger might become bold strokes, sadness might become gentle humming"
        },
        {
          step: 4,
          instruction: "Create freely for 15 minutes without critiquing or editing.",
          duration: "15 minutes",
          tip: "Let your hands or voice move intuitively - there's no wrong way"
        },
        {
          step: 5,
          instruction: "Step back and observe your creation without judgment.",
          duration: "3 minutes",
          tip: "Notice colors, textures, sounds, or patterns that emerged naturally"
        },
        {
          step: 6,
          instruction: "Write or think about what this creative expression represents for you.",
          duration: "5 minutes",
          tip: "This helps integrate the emotional processing that occurred"
        },
        {
          step: 7,
          instruction: "Appreciate yourself for taking time to create and express.",
          duration: "2 minutes",
          tip: "This builds a positive association with creative self-care"
        }
      ],
      modifications: [
        "Use digital tools if physical materials aren't available",
        "Try movement or dance if traditional art/music doesn't appeal",
        "Use guided imagery or visualization as a form of creative expression",
        "Collaborate with others online or in person if desired"
      ],
      safetyNotes: [
        "Stop if creative expression brings up overwhelming trauma memories",
        "Remember that dark or difficult themes in art are normal and healthy",
        "Avoid self-criticism or comparison to others' work",
        "Consider sharing your creations only if it feels safe and desired"
      ]
    },
    "trauma-informed-body-scan": {
      id: "trauma-informed-body-scan",
      name: "Trauma-Informed Body Scan",
      type: "healing",
      description: "A gentle body awareness practice that respects trauma responses and promotes safety",
      evidenceBasis: "Adapted from MBSR and Trauma-Sensitive Mindfulness protocols (Treleaven, 2018)",
      traumaInformed: "Emphasizes choice, control, and the option to disconnect from triggering sensations",
      benefits: [
        "Increases body awareness safely",
        "Reduces dissociation",
        "Builds distress tolerance",
        "Promotes nervous system regulation"
      ],
      steps: [
        {
          step: 1,
          instruction: "Choose a position that feels most safe - sitting, lying down, or standing.",
          duration: "1 minute",
          tip: "You can keep your eyes open or closed - whatever feels safer"
        },
        {
          step: 2,
          instruction: "Notice your points of contact with your support surface (chair, bed, floor).",
          duration: "2 minutes",
          tip: "This grounding helps establish safety before internal focus"
        },
        {
          step: 3,
          instruction: "Bring gentle attention to your feet. Notice temperature, pressure, or tingling.",
          duration: "2 minutes",
          tip: "If any area feels uncomfortable or triggering, simply move your attention elsewhere"
        },
        {
          step: 4,
          instruction: "Slowly move attention up through your legs, noticing sensations without judgment.",
          duration: "3 minutes",
          tip: "Use about 80% attention on body, 20% on the room around you for safety"
        },
        {
          step: 5,
          instruction: "Continue through torso, arms, and head, moving at your own pace.",
          duration: "8 minutes",
          tip: "Skip any areas that hold trauma or feel uncomfortable"
        },
        {
          step: 6,
          instruction: "End by noticing your whole body as one connected system.",
          duration: "2 minutes",
          tip: "Appreciate your body for carrying you through this practice"
        },
        {
          step: 7,
          instruction: "Gently wiggle fingers and toes, take three normal breaths.",
          duration: "1 minute",
          tip: "This helps you fully return to present moment awareness"
        }
      ],
      modifications: [
        "Keep eyes open if closing them feels unsafe",
        "Focus only on external sensations (clothing, air temperature) if internal feels too intense",
        "Use the 'window of tolerance' - stay within comfortable sensation levels",
        "Try focusing on just hands or feet if full body feels overwhelming"
      ],
      safetyNotes: [
        "You have permission to stop or modify this practice at any time",
        "If you dissociate, focus on external sounds or textures to reconnect",
        "Avoid areas where trauma is stored in the body",
        "This should feel curious and gentle, never forced or invasive"
      ]
    },
    "progressive-muscle-relaxation": {
      id: "progressive-muscle-relaxation",
      name: "Progressive Muscle Relaxation",
      type: "healing",
      description: "A systematic tension and release practice that helps distinguish between stress and relaxation",
      evidenceBasis: "Developed by Jacobson (1938), extensively researched for anxiety and PTSD symptom reduction",
      traumaInformed: "Modified to allow choice in which muscles to engage and respect trauma-related muscle tension",
      benefits: [
        "Reduces physical tension",
        "Improves awareness of stress signals",
        "Promotes deeper relaxation",
        "Helps with sleep preparation"
      ],
      steps: [
        {
          step: 1,
          instruction: "Sit or lie in a comfortable position. Take three natural breaths.",
          duration: "1 minute",
          tip: "Choose a position where you feel most in control and safe"
        },
        {
          step: 2,
          instruction: "Start with your feet. Curl your toes tightly for 5 seconds, then release.",
          duration: "30 seconds",
          tip: "Notice the contrast between tension and relaxation"
        },
        {
          step: 3,
          instruction: "Tense your calf muscles by pointing toes toward your shins, hold, then release.",
          duration: "30 seconds",
          tip: "Only use about 70% of your maximum tension - this should never be painful"
        },
        {
          step: 4,
          instruction: "Continue up through thighs, glutes, abdomen, and back - tense and release each area.",
          duration: "8 minutes",
          tip: "Skip any muscle groups that are injured or hold trauma"
        },
        {
          step: 5,
          instruction: "Work through arms: make fists, tense biceps, then shoulders up to ears.",
          duration: "3 minutes",
          tip: "Release shoulders with a gentle rolling motion"
        },
        {
          step: 6,
          instruction: "Finish with face muscles: scrunch face tight, then release into soft expression.",
          duration: "1 minute",
          tip: "End with a gentle smile or neutral expression"
        },
        {
          step: 7,
          instruction: "Do a final full-body tense for 5 seconds, then completely release everything.",
          duration: "30 seconds",
          tip: "This helps integrate the relaxation response throughout your body"
        },
        {
          step: 8,
          instruction: "Rest in complete relaxation for 5 minutes, noticing the sensations.",
          duration: "5 minutes",
          tip: "If you fall asleep here, that's perfectly fine and beneficial"
        }
      ],
      modifications: [
        "Focus only on hands and arms if full body feels too activating",
        "Use gentle muscle engagement rather than forceful tension",
        "Practice 'release without tension' - just letting go without the tense phase",
        "Do seated version if lying down triggers hypervigilance"
      ],
      safetyNotes: [
        "Never tense muscles that are injured or painful",
        "Avoid areas where trauma may be stored physically",
        "Stop if you experience muscle cramps or sharp pain",
        "If anxiety increases, focus on just the release phase without tensing"
      ]
    },
    "trauma-safe-breathing": {
      id: "trauma-safe-breathing",
      name: "Trauma-Safe Grounding Breathwork",
      type: "somatic-intervention",
      description: "Gentle respiratory technique designed specifically for trauma survivors to promote nervous system regulation without triggering hypervigilance",
      evidenceBasis: "Based on Trauma-Sensitive Mindfulness (Treleaven, 2018) and Somatic Experiencing principles (Levine, 2010). Emphasizes choice, control, and nervous system safety",
      traumaInformed: "Allows complete control over breathing patterns and can be stopped at any time if triggering",
      benefits: [
        "Regulates nervous system safely",
        "Reduces hyperarousal",
        "Increases sense of control",
        "Grounds in present moment"
      ],
      steps: [
        {
          step: 1,
          instruction: "Find a position where you feel safe and supported - sitting, standing, or lying down.",
          duration: "1 minute",
          tip: "Your comfort and sense of safety are more important than any 'correct' position"
        },
        {
          step: 2,
          instruction: "Place one hand on your chest, one on your belly, or keep hands wherever feels comfortable.",
          duration: "30 seconds",
          tip: "Some trauma survivors prefer not to touch their body - that's completely fine"
        },
        {
          step: 3,
          instruction: "Breathe normally and just notice your natural breath rhythm without changing it.",
          duration: "2 minutes",
          tip: "There's no need to control your breathing - just observe"
        },
        {
          step: 4,
          instruction: "If it feels safe, gently lengthen your exhale by 1-2 seconds.",
          duration: "5 minutes",
          tip: "Only do this if it feels comfortable - forced breathing can trigger trauma responses"
        },
        {
          step: 5,
          instruction: "Return to natural breathing and notice how your body feels now.",
          duration: "1 minute",
          tip: "Any sensation is normal - tingling, warmth, calm, or even anxiety"
        }
      ],
      modifications: [
        "Keep eyes open if closing them feels unsafe",
        "Breathe through mouth if nose breathing triggers panic",
        "Stop and ground in your environment if you feel disconnected",
        "Use counting or humming if breath focus is triggering"
      ],
      safetyNotes: [
        "Stop immediately if you feel dizzy, panicky, or disconnected",
        "Trauma survivors may feel vulnerable during breathing exercises",
        "It's normal for emotions to arise - this is part of healing",
        "Never force any breathing pattern that doesn't feel safe"
      ]
    },
    "grounding-5432": {
      id: "grounding-5432",
      name: "5-4-3-2-1 Trauma Grounding Technique",
      type: "grounding",
      description: "Sensory-based grounding technique that helps trauma survivors reconnect with the present moment and reduce dissociation",
      evidenceBasis: "Grounded in trauma-informed care principles and sensory integration therapy. Helps activate the prefrontal cortex to override limbic system activation",
      traumaInformed: "Uses external focus to prevent re-traumatization and allows choice in what senses to engage",
      benefits: [
        "Reduces dissociation",
        "Anchors in present moment",
        "Activates rational brain",
        "Provides sense of control"
      ],
      steps: [
        {
          step: 1,
          instruction: "Name 5 things you can see around you. Look for details - colors, shapes, textures.",
          duration: "2 minutes",
          tip: "Focus on neutral objects rather than anything that might be triggering"
        },
        {
          step: 2,
          instruction: "Name 4 things you can physically touch or feel. Notice textures, temperatures.",
          duration: "2 minutes",
          tip: "You can touch your clothes, a chair, the ground - whatever feels safe"
        },
        {
          step: 3,
          instruction: "Name 3 things you can hear. Include distant and nearby sounds.",
          duration: "2 minutes",
          tip: "Traffic, birds, air conditioning, your own breathing - all sounds count"
        },
        {
          step: 4,
          instruction: "Name 2 things you can smell. If you can't smell anything, that's okay too.",
          duration: "1 minute",
          tip: "Some people have difficulty with smell after trauma - this is normal"
        },
        {
          step: 5,
          instruction: "Name 1 thing you can taste, or take a sip of water to activate taste.",
          duration: "1 minute",
          tip: "Even the taste of your own mouth counts"
        },
        {
          step: 6,
          instruction: "Take three natural breaths and notice if you feel more present.",
          duration: "1 minute",
          tip: "Even small increases in presence are meaningful progress"
        }
      ],
      modifications: [
        "Skip any sense that feels triggering (especially touch or smell)",
        "Use only sight and sound if other senses are overwhelming",
        "Add movement by wiggling fingers or toes",
        "Repeat the sequence if needed for stronger grounding"
      ],
      safetyNotes: [
        "Some trauma survivors have altered sensory experiences",
        "It's okay if you can't access all five senses",
        "Stop if any sense brings up traumatic memories",
        "This technique may initially increase anxiety before it helps"
      ]
    },
    "window-of-tolerance": {
      id: "window-of-tolerance",
      name: "Window of Tolerance Education",
      type: "psychoeducation",
      description: "Educational module about nervous system regulation and the concept of optimal arousal zones for trauma recovery",
      evidenceBasis: "Based on Dan Siegel's Window of Tolerance concept and Polyvagal Theory (Porges). Core concept in trauma-informed therapy",
      traumaInformed: "Normalizes trauma responses and provides framework for understanding nervous system reactions",
      benefits: [
        "Normalizes trauma responses",
        "Provides language for experiences",
        "Reduces self-blame",
        "Increases self-awareness"
      ],
      steps: [
        {
          step: 1,
          instruction: "Learn about your nervous system: Sympathetic (fight/flight), Parasympathetic (rest/digest), and Dorsal Vagal (freeze/shutdown).",
          duration: "5 minutes",
          tip: "Think of these as automatic responses designed to keep you safe"
        },
        {
          step: 2,
          instruction: "Understand your Window of Tolerance - the zone where you feel calm, alert, and able to think clearly.",
          duration: "5 minutes",
          tip: "Everyone's window is different, and trauma can make windows narrower"
        },
        {
          step: 3,
          instruction: "Identify Hyperarousal signs: anxiety, panic, anger, racing thoughts, restlessness.",
          duration: "5 minutes",
          tip: "This is when your nervous system is revved up beyond your window"
        },
        {
          step: 4,
          instruction: "Identify Hypoarousal signs: numbness, disconnection, depression, fatigue, brain fog.",
          duration: "5 minutes",
          tip: "This is when your nervous system has shut down below your window"
        },
        {
          step: 5,
          instruction: "Practice recognizing your current state: In window, above window, or below window.",
          duration: "3 minutes",
          tip: "Just noticing without judgment is the first step to regulation"
        },
        {
          step: 6,
          instruction: "Learn that healing involves gradually widening your window of tolerance.",
          duration: "2 minutes",
          tip: "This happens slowly and safely with practice and support"
        }
      ],
      modifications: [
        "Use visual aids or diagrams if available",
        "Connect concepts to personal experiences when ready",
        "Take breaks if information feels overwhelming",
        "Focus on just one concept per session if needed"
      ],
      safetyNotes: [
        "This is education, not therapy - seek professional help for processing",
        "Some people may feel validated while others may feel overwhelmed",
        "It's normal to move in and out of your window throughout the day",
        "Having a narrow window doesn't mean you're broken - it means you've survived"
      ]
    },
    "safe-place-visualization": {
      id: "safe-place-visualization",
      name: "Safe Place Visualization",
      type: "visualization",
      description: "Trauma-informed guided imagery to create an internal sense of safety and calm",
      evidenceBasis: "Fundamental technique in EMDR therapy and trauma treatment. Creates positive neural pathways and emotional regulation resources",
      traumaInformed: "Emphasizes complete control over the visualization and ability to stop anytime",
      benefits: [
        "Creates internal safety resource",
        "Provides refuge during difficult moments",
        "Strengthens positive neural pathways",
        "Increases sense of personal agency"
      ],
      steps: [
        {
          step: 1,
          instruction: "Find a comfortable position where you feel safe right now.",
          duration: "1 minute",
          tip: "You can keep your eyes open or closed - whatever feels safer"
        },
        {
          step: 2,
          instruction: "Think of a place where you feel completely safe and peaceful. This can be real or imaginary.",
          duration: "2 minutes",
          tip: "Popular choices: beach, forest, childhood room, grandmother's kitchen, fantasy places"
        },
        {
          step: 3,
          instruction: "Visualize what you see in this place. Notice colors, lighting, objects, and scenery.",
          duration: "3 minutes",
          tip: "If visualization is difficult, just think about the place or describe it in words"
        },
        {
          step: 4,
          instruction: "Notice what you hear in your safe place - sounds, music, silence, nature sounds.",
          duration: "2 minutes",
          tip: "Some people's safe places are completely quiet, and that's perfect too"
        },
        {
          step: 5,
          instruction: "Feel what you might touch - textures, temperatures, surfaces.",
          duration: "2 minutes",
          tip: "Sand, soft blankets, warm sun, cool breeze - whatever feels comforting"
        },
        {
          step: 6,
          instruction: "Notice any smells or tastes that make this place special.",
          duration: "1 minute",
          tip: "Fresh air, flowers, baking bread - or no particular scents at all"
        },
        {
          step: 7,
          instruction: "Most importantly, feel the emotions of being in this safe place.",
          duration: "3 minutes",
          tip: "Peace, calm, security, love, contentment - whatever safety feels like to you"
        },
        {
          step: 8,
          instruction: "Know that you can return to this place anytime you need to feel safe.",
          duration: "1 minute",
          tip: "This place exists within you and no one can take it away"
        }
      ],
      modifications: [
        "Use photos or artwork if visualization is difficult",
        "Create multiple safe places for different needs",
        "Include protective figures or animals if desired",
        "Focus on just one sense if full visualization is overwhelming"
      ],
      safetyNotes: [
        "If you can't think of a safe place, you can imagine one or use guided imagery",
        "Some trauma survivors struggle with visualization - that's normal",
        "Stop if the exercise brings up unsafe or traumatic memories",
        "Your safe place should never include people who have hurt you"
      ]
    },
    "distress-tolerance": {
      id: "distress-tolerance",
      name: "Distress Tolerance Skills Training",
      type: "coping-skills",
      description: "Evidence-based techniques from Dialectical Behavior Therapy for managing intense emotions without making them worse",
      evidenceBasis: "Core component of DBT developed by Marsha Linehan. Extensively researched for trauma, BPD, and emotional dysregulation",
      traumaInformed: "Acknowledges that some distress cannot be solved immediately and focuses on surviving crisis moments safely",
      benefits: [
        "Prevents impulsive harmful behaviors",
        "Reduces emotional intensity over time",
        "Builds confidence in handling difficult emotions",
        "Provides practical crisis survival tools"
      ],
      steps: [
        {
          step: 1,
          instruction: "Recognize that you're in emotional distress and rate intensity 1-10.",
          duration: "1 minute",
          tip: "Naming and rating creates distance between you and the emotion"
        },
        {
          step: 2,
          instruction: "Use TIPP for immediate relief: Temperature (cold water on face), Intense exercise (30 sec), Paced breathing, Progressive muscle relaxation.",
          duration: "5 minutes",
          tip: "These change your body chemistry quickly to reduce emotional intensity"
        },
        {
          step: 3,
          instruction: "Practice Distraction with ACCEPTS: Activities, Contributing, Comparisons, Emotions (opposite), Push away, Thoughts, Sensations.",
          duration: "10 minutes",
          tip: "Choose one that feels most accessible right now"
        },
        {
          step: 4,
          instruction: "Use Self-Soothing with five senses: See something beautiful, Hear calming sounds, Smell something pleasant, Taste something soothing, Touch something comforting.",
          duration: "10 minutes",
          tip: "This activates your parasympathetic nervous system"
        },
        {
          step: 5,
          instruction: "Practice Radical Acceptance: 'This moment is painful AND I can survive it.'",
          duration: "3 minutes",
          tip: "Acceptance doesn't mean liking it - just acknowledging reality"
        },
        {
          step: 6,
          instruction: "Rate your distress again and notice any changes.",
          duration: "1 minute",
          tip: "Even small decreases show these skills are working"
        }
      ],
      modifications: [
        "Start with just one TIPP technique if feeling overwhelmed",
        "Create a personalized distraction list ahead of time",
        "Use gentle self-soothing if trauma affects sensory experiences",
        "Practice acceptance phrases that feel authentic to you"
      ],
      safetyNotes: [
        "These are crisis survival skills, not long-term solutions",
        "If having thoughts of self-harm, reach out for professional help immediately",
        "Some emotions require action (like fear in dangerous situations)",
        "Building distress tolerance takes practice - be patient with yourself"
      ]
    },
    // Additional Common Guides
    "somatic-grounding-practice": {
      id: "somatic-grounding-practice",
      name: "Somatic Grounding Practice",
      type: "somatic",
      description: "Body-based grounding techniques to reconnect with the present moment",
      evidenceBasis: "Based on somatic experiencing and sensorimotor psychotherapy",
      traumaInformed: "Gentle body awareness with choice and control",
      benefits: ["Reduces dissociation", "Anchors in present", "Calms nervous system", "Builds body trust"],
      steps: [
        { step: 1, instruction: "Feel your feet on the floor. Press down gently and notice the connection.", duration: "2 min" },
        { step: 2, instruction: "Notice your seat on the chair. Feel the support beneath you.", duration: "2 min" },
        { step: 3, instruction: "Press your hands together or onto your thighs. Notice the pressure.", duration: "2 min" },
        { step: 4, instruction: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.", duration: "5 min" },
        { step: 5, instruction: "Take 3 deep breaths, feeling your body expand and contract.", duration: "2 min" }
      ],
      modifications: ["Can be done standing or lying", "Adjust pace as needed", "Focus on just feet if full body feels overwhelming"],
      safetyNotes: ["Stop if you feel more disconnected", "Grounding should increase presence, not trigger"]
    },
    "narrative-therapy-letter-writing": {
      id: "narrative-therapy-letter-writing",
      name: "Narrative Therapy Letter Writing",
      type: "therapy",
      description: "Therapeutic letter writing to process experiences and rewrite your story",
      evidenceBasis: "Based on narrative therapy principles (White & Epston)",
      traumaInformed: "Allows you to tell your story on your terms",
      benefits: ["Process difficult experiences", "Externalize problems", "Reclaim narrative", "Find meaning"],
      steps: [
        { step: 1, instruction: "Choose who you're writing to: yourself, someone else, or a symbolic figure.", duration: "2 min" },
        { step: 2, instruction: "Set a timer for 15 minutes and write without censoring.", duration: "15 min", tip: "Don't worry about grammar or perfection" },
        { step: 3, instruction: "Express what you need to say - anger, grief, love, forgiveness.", duration: "included above" },
        { step: 4, instruction: "Read what you wrote. Notice what emerges.", duration: "5 min" },
        { step: 5, instruction: "Decide what to do with the letter: keep, burn, send, or ceremonially release it.", duration: "3 min" }
      ],
      modifications: ["Voice record instead of write", "Type on computer", "Create a collage instead"],
      safetyNotes: ["This may bring up strong emotions", "Have support available", "You don't have to send the letter"]
    },
    "inner-sanctuary-visualization": {
      id: "inner-sanctuary-visualization",
      name: "Inner Sanctuary Visualization",
      type: "healing",
      description: "Guided imagery to create a safe internal space",
      evidenceBasis: "Based on guided imagery and safe place protocols used in trauma therapy",
      traumaInformed: "Creates internal resource of safety and control",
      benefits: ["Builds internal safety", "Provides refuge during distress", "Activates relaxation response", "Strengthens imagination"],
      steps: [
        { step: 1, instruction: "Close your eyes and take 3 deep breaths.", duration: "1 min" },
        { step: 2, instruction: "Imagine a place where you feel completely safe - real or imagined.", duration: "3 min", tip: "This could be nature, a room, or even a floating cloud" },
        { step: 3, instruction: "Notice all the details: colors, sounds, smells, textures, temperature.", duration: "5 min" },
        { step: 4, instruction: "Add anything that would make it more perfect and safe for you.", duration: "3 min" },
        { step: 5, instruction: "Know you can return here anytime you need to.", duration: "2 min" },
        { step: 6, instruction: "Slowly return to the present, bringing the feeling of safety with you.", duration: "1 min" }
      ],
      modifications: ["Draw or describe your sanctuary", "Visit in small moments throughout the day", "Customize any time"],
      safetyNotes: ["If imagery triggers you, return to present", "Your sanctuary can change over time", "This is YOUR safe space"]
    },
    "core-values-identification": {
      id: "core-values-identification",
      name: "Core Values Identification",
      type: "reflection",
      description: "Discover and clarify your deepest personal values",
      evidenceBasis: "Based on Acceptance and Commitment Therapy (ACT) values work",
      traumaInformed: "Reconnects you with what matters beyond survival",
      benefits: ["Clarifies life direction", "Guides decision-making", "Increases motivation", "Builds authentic life"],
      steps: [
        { step: 1, instruction: "Review a list of common values (love, growth, creativity, justice, etc.)", duration: "5 min" },
        { step: 2, instruction: "Circle or write down 10-15 that resonate most.", duration: "5 min" },
        { step: 3, instruction: "Narrow to your top 5 core values.", duration: "5 min", tip: "Ask: Which would I keep if I could only choose 5?" },
        { step: 4, instruction: "For each value, write why it matters to you.", duration: "10 min" },
        { step: 5, instruction: "Reflect: How am I currently living (or not living) these values?", duration: "5 min" }
      ],
      modifications: ["Use values card sort", "Discuss with trusted friend", "Revisit and revise over time"],
      safetyNotes: ["Values are directions, not destinations", "It's okay if you're not living your values yet", "This is about discovery, not judgment"]
    },
    "grief-education": {
      id: "grief-education",
      name: "Understanding Grief",
      type: "therapy",
      description: "Psychoeducation about the grief process and normalizing grief responses",
      evidenceBasis: "Based on contemporary grief theory (Worden, Neimeyer) moving beyond stages model",
      traumaInformed: "Normalizes all grief responses without judgment",
      benefits: ["Normalizes your experience", "Reduces isolation", "Provides language for grief", "Challenges myths"],
      steps: [
        { step: 1, instruction: "Learn: Grief is not linear - there are no stages to complete in order.", duration: "5 min" },
        { step: 2, instruction: "Grief includes many emotions: sadness, anger, guilt, relief, numbness, love.", duration: "5 min" },
        { step: 3, instruction: "Physical symptoms are normal: fatigue, appetite changes, sleep issues, pain.", duration: "5 min" },
        { step: 4, instruction: "Grief comes in waves - you may feel okay, then suddenly overwhelmed.", duration: "5 min", tip: "This is normal and doesn't mean you're going backward" },
        { step: 5, instruction: "There's no timeline - your grief is as unique as your relationship.", duration: "5 min" }
      ],
      modifications: ["Read articles or books on grief", "Join grief support group", "Watch educational videos"],
      safetyNotes: ["Grief is not something to 'get over'", "Professional help is appropriate for complicated grief", "You're not broken - you're grieving"]
    },
    "family-breathing": {
      id: "family-breathing",
      name: "Family Breathing Together",
      type: "mindfulness",
      description: "Age-appropriate breathing practice for families to do together",
      evidenceBasis: "Adapted from child-friendly mindfulness practices",
      traumaInformed: "Creates safety through connection and synchronized regulation",
      benefits: ["Co-regulation", "Family bonding", "Shared calm", "Builds routine"],
      steps: [
        { step: 1, instruction: "Sit together in a circle or close together.", duration: "1 min" },
        { step: 2, instruction: "Adults model slow, calm breathing first.", duration: "2 min" },
        { step: 3, instruction: "For young children: 'Smell the flowers (inhale), blow out the candles (exhale).'", duration: "5 min", tip: "Make it playful and age-appropriate" },
        { step: 4, instruction: "For older children: Try synchronized breathing, matching each other's rhythm.", duration: "5 min" },
        { step: 5, instruction: "End with everyone sharing one word about how they feel.", duration: "2 min" }
      ],
      modifications: ["Use stuffed animal on belly to watch rise and fall", "Add gentle music", "Keep very short (2-3 min) for young children"],
      safetyNotes: ["Never force children to participate", "Follow their lead and energy", "Stop if anyone becomes distressed"]
    },
    "family-grief-education": {
      id: "family-grief-education",
      name: "Understanding Grief as a Family",
      type: "therapy",
      description: "Age-appropriate grief education for the whole family",
      evidenceBasis: "Based on developmental grief theory and family systems approaches",
      traumaInformed: "Honors different developmental stages and grief expressions",
      benefits: ["Shared understanding", "Normalized responses", "Open communication", "Reduced isolation"],
      steps: [
        { step: 1, instruction: "Explain grief using age-appropriate language for all family members.", duration: "8 min", tip: "Young children: feelings come and go like waves" },
        { step: 2, instruction: "Normalize that everyone grieves differently.", duration: "5 min" },
        { step: 3, instruction: "Discuss that ALL feelings are okay - sad, mad, confused, even happy sometimes.", duration: "5 min" },
        { step: 4, instruction: "Share that grief doesn't mean forgetting - we keep loving even when someone is gone.", duration: "5 min" },
        { step: 5, instruction: "Create family language for grief (sad times, missing times, remembering times).", duration: "5 min" }
      ],
      modifications: ["Use books or videos for different ages", "Have individual then group discussions", "Revisit as children develop"],
      safetyNotes: ["Protect children from graphic details", "Honest without overwhelming", "Professional support for complicated grief"]
    },
    "family-art-therapy": {
      id: "family-art-therapy",
      name: "Art Therapy Together",
      type: "creative",
      description: "Shared creative expression for processing emotions as a family",
      evidenceBasis: "Based on expressive arts therapy and play therapy principles",
      traumaInformed: "Non-verbal expression safe for all ages",
      benefits: ["Non-verbal processing", "Shared creation", "Emotional expression", "Memory making"],
      steps: [
        { step: 1, instruction: "Gather simple art supplies everyone can use.", duration: "3 min" },
        { step: 2, instruction: "Choose a theme: 'Our family,' 'Our memories,' 'How we feel,' or open-ended.", duration: "2 min" },
        { step: 3, instruction: "Create together in silence or with gentle music for 15-20 minutes.", duration: "20 min" },
        { step: 4, instruction: "Share creations, with each person explaining if they choose to.", duration: "10 min", tip: "No one has to share" },
        { step: 5, instruction: "Display art or create a family art journal.", duration: "5 min" }
      ],
      modifications: ["Use clay, collage, or nature materials", "Create individual then combine pieces", "Dance or movement instead"],
      safetyNotes: ["Process over product", "No criticism of artwork", "Respect if someone doesn't want to share"]
    }
  };

  // Check if the selected activity guide exists
  const currentGuide = activityGuides[selectedActivity];
  
  if (!currentGuide) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onBack}>
              ← Back to Program
            </Button>
          </div>
          
          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Activity Guide Not Available
              </CardTitle>
              <CardDescription>
                This activity guide is currently being developed. Please check back soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We're working on creating comprehensive guides for all activities. 
                In the meantime, you can still participate in the activity using your own approach or seeking guidance from a healthcare professional.
              </p>
              <Button onClick={onBack} variant="healing">
                Return to Daily Program
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const toggleStep = (stepNumber: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepNumber)) {
      newCompleted.delete(stepNumber);
    } else {
      newCompleted.add(stepNumber);
    }
    setCompletedSteps(newCompleted);
  };

  const completedCount = completedSteps.size;
  const totalSteps = currentGuide.steps.length;
  const progressPercentage = (completedCount / totalSteps) * 100;

  const getTypeIcon = (type: string) => {
    const icons = {
      mindfulness: Heart,
      reflection: BookOpen,
      healing: Shield,
      movement: Leaf,
      nutrition: Leaf,
      creative: Brain,
      nature: Leaf
    };
    return icons[type as keyof typeof icons] || BookOpen;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      mindfulness: "healing",
      reflection: "nature", 
      nutrition: "calm",
      movement: "earth",
      healing: "healing",
      creative: "nature",
      nature: "calm"
    };
    return colors[type as keyof typeof colors] || "secondary";
  };

  const getResponseType = (activityType: string): "journal" | "scale" | "emotion" | "reflection" | "gratitude" => {
    const responseMap: Record<string, "journal" | "scale" | "emotion" | "reflection" | "gratitude"> = {
      "somatic-intervention": "scale",
      "cognitive-behavioral": "gratitude",
      "dialectical-behavioral-therapy": "emotion",
      "healing": "reflection",
      "nature": "reflection",
      "creative": "journal",
      "mindfulness": "reflection"
    };
    return responseMap[activityType] || "reflection";
  };

  const getPromptsForActivity = (activityType: string): string[] => {
    const prompts: Record<string, string[]> = {
      "somatic-intervention": ["How did your breathing feel during this practice?", "What physical sensations did you notice?"],
      "cognitive-behavioral": ["What thoughts came up during this practice?", "How did this practice affect your mindset?"],
      "dialectical-behavioral-therapy": ["What emotions did you work with today?", "How effective were the regulation techniques?"],
      "healing": ["What insights emerged during this practice?", "How do you feel now compared to when you started?"],
      "nature": ["How did connecting with nature affect your mood?", "What did you notice about your environment?"],
      "creative": ["What did your creative expression reveal about your inner state?", "How did it feel to create without judgment?"],
      "mindfulness": ["What did you become aware of during this practice?", "How present did you feel throughout the exercise?"]
    };
    return prompts[activityType] || ["How was this practice for you?", "What did you learn about yourself?"];
  };

  const TypeIcon = getTypeIcon(currentGuide.type);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-nurturing">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${getTypeColor(currentGuide.type)}/10`}>
                <TypeIcon className={`w-6 h-6 text-${getTypeColor(currentGuide.type)}`} />
              </div>
              <div>
                <CardTitle className="text-xl">{currentGuide.name}</CardTitle>
                <CardDescription>{currentGuide.description}</CardDescription>
              </div>
            </div>
            <Button onClick={onBack} variant="outline">
              Back to Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary" className={`bg-${getTypeColor(currentGuide.type)}/10 text-${getTypeColor(currentGuide.type)}`}>
              {currentGuide.type}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{totalSteps} steps</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{completedCount}/{totalSteps} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Base & Trauma-Informed Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-healing/5 border-healing/20">
          <CardHeader>
            <CardTitle className="text-sm text-healing">Evidence-Based Foundation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{currentGuide.evidenceBasis}</p>
          </CardContent>
        </Card>
        <Card className="bg-nature/5 border-nature/20">
          <CardHeader>
            <CardTitle className="text-sm text-nature">Trauma-Informed Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{currentGuide.traumaInformed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Benefits */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle className="text-lg">Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2">
            {currentGuide.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-healing" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Guide */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle className="text-lg">Step-by-Step Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentGuide.steps.map((step) => {
              const isCompleted = completedSteps.has(step.step);
              return (
                <div 
                  key={step.step}
                  className={`border rounded-lg p-4 transition-colors ${
                    isCompleted ? 'bg-healing/5 border-healing/20' : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleStep(step.step)}
                      className="h-8 w-8 p-0 mt-1"
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-healing" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex items-center justify-center text-xs">
                          {step.step}
                        </div>
                      )}
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Step {step.step}</span>
                        <Badge variant="outline" className="text-xs">
                          {step.duration}
                        </Badge>
                      </div>
                      <p className={`text-sm mb-2 ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                        {step.instruction}
                      </p>
                      {step.tip && (
                        <div className="bg-calm/10 border border-calm/20 rounded p-2 text-xs">
                          <span className="font-medium text-calm">💡 Tip: </span>
                          {step.tip}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Audio Guidance for meditation/breathwork activities */}
      {(currentGuide.type === "somatic-intervention" || currentGuide.type === "healing" || currentGuide.type === "mindfulness") && (
        <AudioGuidance 
          guideId={currentGuide.id}
          guideName={currentGuide.name}
          activityType={currentGuide.type}
          instructions={currentGuide.steps.map(step => step.instruction)}
          onAudioComplete={() => {
            toast({
              title: "Practice Complete",
              description: "Take a moment to reflect on your experience."
            });
            setShowResponses(true);
          }}
        />
      )}

      {/* Interactive Response Capture */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Track Your Experience</h3>
          <Button 
            onClick={() => setShowResponses(!showResponses)}
            variant="outline"
            size="sm"
          >
            {showResponses ? "Hide" : "Show"} Response Form
          </Button>
        </div>
        
        {showResponses && (
          <ActivityResponse
            activityId={currentGuide.id}
            activityName={currentGuide.name}
            responseType={getResponseType(currentGuide.type)}
            prompts={getPromptsForActivity(currentGuide.type)}
            onSave={(responses) => {
              console.log("Activity responses saved:", responses);
              toast({
                title: "Progress Tracked",
                description: "Your responses have been saved to your progress history."
              });
            }}
          />
        )}
      </div>

      {/* Safety & Modifications */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="modifications">
          <AccordionTrigger className="text-left">
            <span className="text-earth">Modifications & Adaptations</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {currentGuide.modifications.map((modification, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-earth mt-1">•</span>
                  <span>{modification}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="safety">
          <AccordionTrigger className="text-left">
            <span className="text-destructive">Safety Notes & Precautions</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {currentGuide.safetyNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <Shield className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ActivityGuides;