import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, Clock, DollarSign, Users, Heart } from "lucide-react";

const MealPlan = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  const mealPlan = {
    1: {
      breakfast: {
        name: "Overnight Oats with Berries",
        ingredients: [
          "1/2 cup rolled oats ($0.25)",
          "1/2 cup milk or plant milk ($0.30)", 
          "1 tbsp chia seeds ($0.50)",
          "1/2 cup mixed berries ($1.00)",
          "1 tsp honey ($0.15)",
          "1/4 tsp vanilla extract ($0.10)"
        ],
        instructions: [
          "Mix oats, milk, chia seeds, honey, and vanilla in a jar",
          "Refrigerate overnight (or minimum 4 hours)",
          "Top with fresh berries before serving",
          "Optional: Add nuts or seeds for extra nutrition"
        ],
        cost: "$2.30",
        prepTime: "5 min prep, overnight setting",
        benefits: "High fiber, omega-3s, antioxidants for brain health",
        moodBoost: "Berries contain anthocyanins that support mood regulation"
      },
      lunch: {
        name: "Healing Lentil & Vegetable Soup",
        ingredients: [
          "1 cup red lentils ($0.75)",
          "2 cups vegetable broth ($0.50)",
          "1 carrot, diced ($0.25)",
          "1 celery stalk, diced ($0.25)",
          "1/2 onion, diced ($0.25)",
          "2 cloves garlic, minced ($0.20)",
          "1 tsp turmeric ($0.10)",
          "1 tsp cumin ($0.10)",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Sauté onion, carrot, and celery until soft (5 min)",
          "Add garlic, turmeric, and cumin, cook 1 min",
          "Add lentils and broth, bring to boil",
          "Simmer 15-20 minutes until lentils are tender",
          "Season with salt and pepper",
          "Serve with whole grain bread if desired"
        ],
        cost: "$2.40",
        prepTime: "25 minutes",
        benefits: "Plant protein, folate, iron for energy and mood",
        moodBoost: "Turmeric has anti-inflammatory properties that support mental clarity"
      },
      dinner: {
        name: "Grounding Sweet Potato & Black Bean Bowl",
        ingredients: [
          "1 medium sweet potato ($0.75)",
          "1/2 cup black beans, cooked ($0.50)",
          "1/4 avocado ($0.75)",
          "1/4 cup quinoa, cooked ($0.50)",
          "1 cup spinach ($0.50)",
          "1 tbsp olive oil ($0.25)",
          "1 tbsp lime juice ($0.15)",
          "1/4 tsp paprika ($0.05)"
        ],
        instructions: [
          "Roast diced sweet potato with olive oil and paprika (25 min at 400°F)",
          "Cook quinoa according to package directions",
          "Heat black beans gently",
          "Arrange spinach in bowl, top with quinoa",
          "Add roasted sweet potato and black beans",
          "Top with sliced avocado and lime juice",
          "Season with salt and pepper"
        ],
        cost: "$3.45",
        prepTime: "30 minutes",
        benefits: "Complex carbs, healthy fats, complete proteins",
        moodBoost: "Sweet potatoes provide steady energy and B-vitamins for stress relief"
      }
    },
    2: {
      breakfast: {
        name: "Calming Chamomile Chia Pudding",
        ingredients: [
          "3 tbsp chia seeds ($0.75)",
          "1 cup coconut milk ($0.60)",
          "1 tbsp chamomile tea, cooled ($0.30)",
          "1 tbsp maple syrup ($0.40)",
          "1/2 banana, sliced ($0.25)",
          "1 tbsp almonds, chopped ($0.50)"
        ],
        instructions: [
          "Brew chamomile tea and let cool completely",
          "Mix chia seeds, coconut milk, tea, and maple syrup",
          "Stir well and refrigerate for 2+ hours or overnight",
          "Stir again before serving",
          "Top with banana slices and chopped almonds"
        ],
        cost: "$2.80",
        prepTime: "5 min prep, 2+ hours setting",
        benefits: "Omega-3s, magnesium, natural calming compounds",
        moodBoost: "Chamomile promotes relaxation and reduces anxiety"
      },
      lunch: {
        name: "Stress-Relief Salmon & Quinoa Salad",
        ingredients: [
          "4 oz canned salmon ($2.00)",
          "1/2 cup quinoa, cooked ($0.50)",
          "1 cup mixed greens ($0.75)",
          "1/4 cucumber, diced ($0.25)",
          "1/4 cup cherry tomatoes ($0.50)",
          "1 tbsp olive oil ($0.25)",
          "1 tbsp lemon juice ($0.15)",
          "1 tsp dried dill ($0.10)"
        ],
        instructions: [
          "Cook quinoa and let cool",
          "Drain and flake salmon",
          "Combine mixed greens, cucumber, and tomatoes",
          "Add quinoa and salmon",
          "Whisk olive oil, lemon juice, and dill",
          "Drizzle dressing over salad and toss gently"
        ],
        cost: "$4.50",
        prepTime: "15 minutes",
        benefits: "Omega-3 fatty acids, complete protein, vitamins",
        moodBoost: "Salmon provides DHA for brain health and mood stability"
      },
      dinner: {
        name: "Comfort Turkey & Vegetable Stir-Fry",
        ingredients: [
          "4 oz ground turkey ($2.50)",
          "1 cup mixed vegetables, frozen ($0.75)",
          "1/2 cup brown rice, cooked ($0.40)",
          "1 tbsp sesame oil ($0.30)",
          "1 tbsp low-sodium soy sauce ($0.15)",
          "1 tsp fresh ginger, grated ($0.20)",
          "2 cloves garlic, minced ($0.20)"
        ],
        instructions: [
          "Cook brown rice according to package directions",
          "Heat sesame oil in large pan",
          "Brown ground turkey, breaking into small pieces",
          "Add garlic and ginger, cook 1 minute",
          "Add frozen vegetables and soy sauce",
          "Stir-fry 5-7 minutes until vegetables are tender",
          "Serve over brown rice"
        ],
        cost: "$4.50",
        prepTime: "20 minutes",
        benefits: "Lean protein, fiber, antioxidants",
        moodBoost: "Ginger has anti-inflammatory properties that support overall wellness"
      }
    }
  };

  const currentMeals = mealPlan[selectedDay as keyof typeof mealPlan] || mealPlan[1];
  const dailyTotal = Object.values(currentMeals).reduce((total, meal) => {
    const cost = parseFloat(meal.cost.replace('$', ''));
    return total + cost;
  }, 0);

  const renderMealCard = (mealType: string, meal: any) => (
    <Card className="shadow-gentle">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="capitalize">{mealType}</span>
          <Badge variant="secondary" className="bg-calm/10 text-calm">
            {meal.cost}
          </Badge>
        </CardTitle>
        <CardDescription className="font-medium text-lg">
          {meal.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              Ingredients
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              {meal.ingredients.map((ingredient: string, index: number) => (
                <li key={index}>• {ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Instructions
            </h4>
            <ol className="text-sm space-y-1 text-muted-foreground list-decimal list-inside">
              {meal.instructions.map((instruction: string, index: number) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-nature" />
            <span><strong>Prep Time:</strong> {meal.prepTime}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Heart className="w-4 h-4 text-healing mt-0.5" />
            <span><strong>Health Benefits:</strong> {meal.benefits}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-calm">💚</span>
            <span><strong>Mood Support:</strong> {meal.moodBoost}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-nurturing">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            14-Day Healing Meal Plan
          </CardTitle>
          <CardDescription>
            Affordable, nutritious meals designed to support mental health and recovery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-healing/5 border-healing/20">
              <CardContent className="pt-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-healing" />
                <div className="text-2xl font-bold text-healing">${dailyTotal.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Daily Cost</div>
              </CardContent>
            </Card>
            <Card className="bg-nature/5 border-nature/20">
              <CardContent className="pt-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-nature" />
                <div className="text-2xl font-bold text-nature">1-2</div>
                <div className="text-sm text-muted-foreground">Servings</div>
              </CardContent>
            </Card>
            <Card className="bg-calm/5 border-calm/20">
              <CardContent className="pt-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-calm" />
                <div className="text-2xl font-bold text-calm">100%</div>
                <div className="text-sm text-muted-foreground">Mood-Supporting</div>
              </CardContent>
            </Card>
          </div>

          {/* Day Selection */}
          <div className="grid grid-cols-7 gap-2">
            {[...Array(14)].map((_, i) => {
              const day = i + 1;
              return (
                <Button
                  key={day}
                  variant={selectedDay === day ? "calm" : "outline"}
                  className="h-10"
                  onClick={() => setSelectedDay(day)}
                >
                  Day {day}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Meals for Selected Day */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">Day {selectedDay} Meals</h2>
        {renderMealCard("breakfast", currentMeals.breakfast)}
        {renderMealCard("lunch", currentMeals.lunch)}
        {renderMealCard("dinner", currentMeals.dinner)}
      </div>

      {/* Shopping & Budget Tips */}
      <Card className="border-earth/20 bg-earth/5">
        <CardHeader>
          <CardTitle className="text-earth">💡 Budget-Friendly Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Buy grains, legumes, and spices in bulk to reduce costs</li>
            <li>• Frozen vegetables are nutritious and often more affordable</li>
            <li>• Prep ingredients on Sundays to save time during the week</li>
            <li>• Canned fish and beans are budget-friendly protein sources</li>
            <li>• Seasonal produce is typically fresher and less expensive</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlan;