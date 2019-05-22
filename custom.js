const reset = () => {
  anime.remove(".dot");
  anime({
    targets: [".dot"],
    translateX: 0,
    translateY: 0,
    scale: 1,
    duration: 0
  });
  anime({
    targets: [".wrap-2 .dot"],
    backgroundColor: "#ffffff",
    translateX: 0,
    translateY: 0,
    duration: 0
  });
  const wrapperClasses = document.getElementsByClassName("wrap")[0].classList;
  wrapperClasses.remove("displace-top");
  wrapperClasses.remove("white");
  document.getElementsByClassName("wrap-2")[0].classList.remove("block");
};

const simpleTranslateY = () => {
  reset();
  anime({
    targets: [".wrap .dot"],
    translateY: [10, 0, -10, 0],
    duration: 400,
    loop: true,
    easing: "easeInOutQuad",
    delay: anime.stagger(350)
  });
};

const atomic = () => {
  reset();
  anime({
    targets: [".wrap .dot"],
    duration: 600,
    scale: [
      { value: 0.1, easing: "easeInOutQuad" },
      { value: 1, easing: "easeOutSine" }
    ],
    opacity: [1, 0.8, 1],
    delay: anime.stagger(250),
    loop: true
  });
};

const pathFollower = () => {
  reset();
  document.getElementsByClassName("wrap")[0].classList.add("displace-top");
  const invisiblePath = anime.path("#invisible-path path");
  anime({
    targets: ".wrap .dot",
    translateX: invisiblePath("x"),
    translateY: invisiblePath("y"),
    duration: 1000,
    easing: "linear",
    loop: true,
    delay: anime.stagger(200),
    direction: "alternate"
  });
};

const circularLoader = () => {
  reset();
  const invisiblePath = anime.path("#invisible-circle ellipse");
  document.getElementsByClassName("wrap")[0].classList.add("white");
  document.getElementsByClassName("wrap-2")[0].classList.add("block");
  anime({
    targets: ".wrap-2 .dot.one",
    translateX: invisiblePath("x"),
    translateY: invisiblePath("y"),
    backgroundColor: ["#ff5555", "#ff5555"],
    duration: 1000,
    easing: "linear",
    loop: true
  });
  setTimeout(() => {
    anime({
      targets: ".wrap-2 .dot.two",
      translateX: invisiblePath("x"),
      translateY: invisiblePath("y"),
      backgroundColor: ["#ff5555", "#ff5555"],
      duration: 1000,
      easing: "linear",
      loop: true
    });
  }, 330);
  setTimeout(() => {
    anime({
      targets: ".wrap-2 .dot.three",
      translateX: invisiblePath("x"),
      translateY: invisiblePath("y"),
      backgroundColor: ["#ff5555", "#ff5555"],
      duration: 1000,
      easing: "linear",
      loop: true
    });
  }, 660);
};

const morph = () => {
  anime({
    targets: "#morph-btn-rect",
    x: {
      value: 0,
      duration: 400,
      easing: "linear"
    },
    y: {
      value: 0,
      duration: 400,
      easing: "linear"
    },
    height: "100%",
    width: "100%",
    duration: 800,
    easing: "easeInQuad"
  });
  setTimeout(() => {
    anime({
      targets: "#morph-btn-rect",
      rx: 0,
      duration: 100,
      easing: "easeInQuad"
    });
  }, 400);
};

// const btnRef = document.getElementById("morph-btn-rect");
// btnRef.addEventListener("click", morph);
class Component extends React.Component {
  componentDidMount() {
    simpleTranslateY();
    const selectItem = document.getElementById("anim-select");

    selectItem.addEventListener("change", evt => {
      switch (evt.target.value) {
        case "up-down":
          simpleTranslateY();
          break;

        case "atomic":
          atomic();
          break;

        case "none":
          reset();
          break;

        case "path":
          pathFollower();
          break;

        case "rotate":
          circularLoader();
          break;

        default:
          break;
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="wrap">
          <div className="dot dot-item" />
          <div className="dot" />
          <div className="dot" />
        </div>
        <div className="wrap-2">
          <div className="dot one dot-item" />
          <div className="dot two" />
          <div className="dot three" />
        </div>
      </React.Fragment>
    );
  }
}

const domContainer = document.querySelector("#react-replace");
ReactDOM.render(<Component />, domContainer);
