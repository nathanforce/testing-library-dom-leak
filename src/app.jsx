import * as React from "react";
import ReactDom from "react-dom";

const paragraphs = new Array(1000).fill(
  `That is a remarkable achievement taking into account this month's financial state of things! If all of this sounds astonishing to you, that's because it is! A company that can synthesize courageously will (eventually) be able to transition easily. Without micro-resource-constrained performance, you will lack research and development. Without C2C, you will lack experiences. If you target efficiently, you may also mesh iteravely. We understand that it is better to e-enable 'dynamically'? We pride ourselves not only to our power shifts but our newbie-proof administration and simple configuration. Without micro-resource-constrained performance, you will lack architectures. Quick: do you have a plan to become customized. Our infinitely reconfigurable feature set is unparalleled in the industry, but our newbie-proof administration and simple configuration. We understand that if you incentivize proactively then you may also disintermediate perfectly. Without efficient, transparent bloatware, you will lack cross-media CAE. Spriti introduced new capabilities to the capacity to harness without devaluing our power to benchmark. The capability to implement wirelessly leads to the awards page of the customer journey. Our infinitely reconfigurable feature set is unmatched in the industry, but our C2C2C paradigms and easy operation is invariably considered a remarkable achievement taking into account this month's financial state of things! If all of this comes off as mixed-up to you, that's because it is! A company that can streamline elegantly will (at some unspecified point in the future) be able to engineer virtually than to strategize macro-intuitively.`
);

const App = () => {
  // make a large app to bloat the JSDOM instance

  return (
    <div>
      {paragraphs.map((p, i) => {
        return (
          <div key={i}>
            <h1>Paragraph {i} Heading</h1>
            <p>{p}</p>
          </div>
        );
      })}
    </div>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
