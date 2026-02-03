export const metadata = {
  title: '标准成交量分析器',
  description: '分析成交量和未来收益的关系，寻找交易信号。',
}

export default function VolumeAnalyzerPage() {
  return (
    <div className="min-h-screen">
      <iframe
        title="标准成交量分析器"
        src="/tools/volume-analyzer/index.html"
        className="h-screen w-full border-0"
      />
    </div>
  )
}
