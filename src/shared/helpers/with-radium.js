import Radium from 'radium'

export default WrappedComponent => Radium({
  plugins: [
    Radium.Plugins.mergeStyleArray,
    Radium.Plugins.checkProps,
    Radium.Plugins.resolveMediaQueries,
    Radium.Plugins.resolveInteractionStyles,
    Radium.Plugins.prefix,
    Radium.Plugins.checkProps,
  ],
})(WrappedComponent)
