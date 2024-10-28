interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const Button = ({ children, className = '', disabled = false, ...rest }: ButtonProps) => {
  const newClassName = `${className} ${disabled ? ' cursor-not-allowed' : ''}`
  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
