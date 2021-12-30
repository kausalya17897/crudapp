import * as React from 'react';
import { useState } from 'react';

function colorbox() {
  const [color, setColor] = useState("red");
  const styles = { backgroundColor: color,marginTop:"200px" };
  return (
    <div>
      <input value={color}
        onChange={(event) => setColor(event.target.value)} style={styles} />
    </div>
  );
}
