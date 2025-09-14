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