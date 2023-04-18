 
function Button(props) {
  return (
    <a
      href={props.href}
      className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-16 py-6 rounded-md hover:bg-blue-600 inline-block"
    >
      {props.children}
    </a>
  )
}

export default Button;
