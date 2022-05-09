import PropTypes from "prop-types";

function Card({ children, reverse }) {
  //user conditional class
  //   return <div className={`card ${reverse && 'reverse'}`}>{children}</div>;

  //user conditional style
  const styleCard = {
    backgroundColor: reverse ? "rgba(0,0,0,0.4)" : "#fff",
    color: reverse ? "#fff" : "#000",
  };

  return (
    <div className="card" style={styleCard}>
      {children}
    </div>
  );
}

Card.defaultProp = {
  reverse: false,
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

export default Card;
