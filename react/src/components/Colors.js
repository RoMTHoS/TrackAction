import React, { useEffect, useState } from "react";
import reactCSS from "reactcss";
import { CompactPicker } from "react-color";

function Colors(props) {
  const bracket = [props.color.indexOf("("), props.color.indexOf(")")];
  const colorBracket = props.color.substring(bracket[0] + 1, bracket[1]);
  const colorRGB = colorBracket.split(",");

  console.log(colorRGB);
  console.log(typeof colorRGB[0]);

  const [color, setColor] = useState({
    r: "152",
    g: "152",
    b: "152",
    a: "1",
  });
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  useEffect(() => {
    setColor({ r: colorRGB[0], g: colorRGB[1], b: colorRGB[2], a: "1" });
  }, []);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.rgb);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <CompactPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

export default Colors;
