import { useState, useContext, useEffect } from "react";
import RatingSelect from "./RatingSelect";
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(8);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setmessage] = useState("");

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
      setBtnDisabled(false);
    }
  }, [feedbackEdit]);

  const handelTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setmessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setmessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setmessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setText("");
      setBtnDisabled(true);
    }
  }

  return (
    <Card>
      <form onSubmit={handelSubmit}>
        <h2>How would You rate your sirvice with us?</h2>

        <RatingSelect select={(rating) => setRating(rating)} />

        <div className="input-group">
          <input
            type="text"
            onChange={handelTextChange}
            placeholder="Write a Review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}
export default FeedbackForm;
