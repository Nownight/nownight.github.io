export const metadata = {
  title: 'AI 命理决策系统',
  description: '基于八字算法与现代行为科学的精准校正，提供个性化建议。',
}

export default function AiDivinationPage() {
  return (
    <div className="min-h-screen">
      <iframe
        title="AI 命理决策系统"
        src="/tools/ai-divination-app/index.html"
        className="h-screen w-full border-0"
      />
    </div>
  )
}
