import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useInsights } from "../features/insights/hooks/useInsights"

export function InsightsPage() {
  const { insights, addInsight, isLoading } = useInsights()
  const [newInsightText, setNewInsightText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddInsight = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInsightText.trim()) return
    setIsSubmitting(true)
    try {
      await addInsight(newInsightText.trim())
      setNewInsightText("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Insights</h1>
        <p className="text-muted-foreground mt-1">Discover patterns in your behavior.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
         <Card>
            <CardHeader>
              <CardTitle>Add New Insight (Manual fallback)</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddInsight} className="flex gap-2">
                 <Input 
                    value={newInsightText}
                    onChange={e => setNewInsightText(e.target.value)}
                    placeholder="E.g. I noticed my stress decreases when I exercise..."
                    className="max-w-xl"
                 />
                 <Button type="submit" disabled={isSubmitting || !newInsightText.trim()}>Save</Button>
              </form>
            </CardContent>
         </Card>

        {isLoading && insights.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">Loading insights...</div>
        ) : insights.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">No insights available yet.</div>
        ) : (
          insights.map((insight) => (
            <Card key={insight.id} className="bg-secondary/30 border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl shadow-sm">
                  💡
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Generated Insight</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight.text}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-3">{new Date(insight.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
