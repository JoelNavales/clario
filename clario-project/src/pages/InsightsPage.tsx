import { Card, CardContent } from "../components/ui/Card"
import { insights } from "../data/mockData"

export function InsightsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Insights</h1>
        <p className="text-muted-foreground mt-1">AI-generated patterns about your well-being.</p>
      </div>
      
      <div className="grid gap-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="bg-gradient-to-r from-background to-secondary/30 border-primary/10 transition-all hover:shadow-md">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="h-10 w-10 shrink-0 rounded-full bg-primary/5 flex items-center justify-center text-primary text-xl">
                ✨
              </div>
              <p className="text-sm leading-relaxed font-medium mt-2">
                {insight.text.split(' ').map((word, i) => {
                  const highlightWords = ['consistently', 'momentum!', 'stressed', 'meditate.', 'high', 'priority'];
                  const isHighlight = highlightWords.includes(word);
                  return (
                    <span key={i} className={isHighlight ? "text-primary font-semibold mx-[2px]" : ""}>
                      {word}{' '}
                    </span>
                  )
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
