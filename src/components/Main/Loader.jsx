/**
    Colored loading component to indicate page load or information fetch.

    @author PatrickBrown1
 */

const Loader = () => (
  <div className="my-36 flex items-center justify-center">
    <div
      className="
        size-10 animate-spin rounded-full border-b-2 border-brand-light-purple
      "
    />
  </div>
)

export default Loader
