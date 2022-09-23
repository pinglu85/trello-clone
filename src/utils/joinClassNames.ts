function joinClassNames(...classnames: string[]): string {
  return classnames.filter((className) => className !== '').join(' ');
}

export default joinClassNames;
