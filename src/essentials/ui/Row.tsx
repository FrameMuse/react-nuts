

export default function Row({ children, gap }: { children: any, gap?: string }) {
  return (
    <div className="row" style={{ "--row-margin-left": gap } as any}>{children}</div>
  )
}
