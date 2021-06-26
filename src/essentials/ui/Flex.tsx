export default function Flex({ children, style }: { children: any; style?: Partial<CSSStyleDeclaration> }) {
  return (
    <div className="flex" style={{ ...style, columnGap: null, "--flex-rowGap": style?.columnGap } as any}>
      {children}
    </div>
  )
}
