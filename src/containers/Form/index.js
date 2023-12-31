import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// ** Error(s) solved : **
// Test error : ● When Events is created › and a click is triggered on the submit button › the success action is called
//    Unable to find an element with the text: Envoyer

// ** Solution : **
// reduce setTimeOUt from 1000 to 900
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 900); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        // ** Error(s) solved : **
        // Test error : ● When Events is created › and a click is triggered on the submit button › the success action is called
        //   Expected number of calls: >= 1
        //   Received number of calls:    0
        // Test error : ● When Form is created › and a click is triggered on the submit button › the success message is displayed
        //    Unable to find an element with the text: Message envoyé !
        
        // ** Solution : **
        // call onSuccess function to display "Message envoyé"
        onSuccess()
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
