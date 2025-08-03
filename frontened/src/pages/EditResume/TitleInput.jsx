import { useState } from "react";

import { titleInputStyles } from "../../assets/dummystyle";
import { Check, Edit } from "lucide-react";

const TitleInput = ({ title, setTitle }) => {
     const [editing, setEditing] = useState(false);
     const [focused, setFocused] = useState(false);
     const styles = titleInputStyles;

     return (
          <div className={styles.container}>
               {editing ? (
                    <>
                         <input
                              type="text"
                              placeholder="Resume title"
                              className={styles.inputField(focused)}
                              value={title}
                              onChange={({ target }) => setTitle(target.value)}
                              onFocus={() => setFocused(true)}
                              onBlur={() => setFocused(false)}
                              autoFocus
                         />
                         <button className={styles.confirmButton} onClick={() => setEditing(false)}>
                              <Check className="w-5 h-5" />
                         </button>
                    </>
               ) : (
                    <>
                         <h2 className={styles.titleText}>{title}</h2>
                         <button className={styles.editButton} onClick={() => setEditing(true)}>
                              <Edit className={styles.editIcon} />
                         </button>
                    </>
               )}
          </div>
     );
};

export default TitleInput;