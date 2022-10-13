declare module '*.css' {
  export default CSSStyleSheet.prototype
}

declare module '*.mdx' {
  const MDXComponent: (props: Record<string, unknown>) => unknown
  export default MDXComponent
}
