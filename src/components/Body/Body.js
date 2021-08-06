import React from "react";
import "./Body.css";

const Body = ({ word, category, meaning }) => {
  return (
    <div className="meaning">
      {meaning[0] && word && category === "en" && (
        <audio
          src={meaning[0].phonetics[0] && meaning[0].phonetics[0].audio}
          style={{ backgroundColor: "white" }}
          controls
        >
          Without audio support
        </audio>
      )}
      {word === "" ? (
        <span className="subtitle">Type a word in search</span>
      ) : (
        meaning.map((el) => {
          return el.meanings.map((item) => {
            return item.definitions.map((el) => {
              return (
                <div className="mean" key={el.definition}>
                  <strong>{el.definition}</strong>
                  <hr style={{ backgroundColor: "black", width: "100%" }} />
                  {el.example && (
                    <span>
                      <em>Example:</em> {el.example}
                    </span>
                  )}
                  {el.synonyms && (
                    <span>
                      <em>Synonyms:</em>
                      {el.synonyms.map((synonym) => {
                        return ` ${synonym}, `;
                      })}
                    </span>
                  )}
                </div>
              );
            });
          });
        })
      )}
    </div>
  );
};

export default Body;
