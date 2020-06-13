import React from "react";

const FooterList = (props) => {
  const listItems = props.items.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  return <ul className="footer-list">{listItems}</ul>;
};

export default FooterList;
