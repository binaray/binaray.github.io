class ModalQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }
  
  render() {
	return e('div', {className:'modal_window container-fluid'}, [
			e(CloseButton, { btnText: '-', href:'#'}, null),
			e('div', {className:'row p-2'}, [
				e('div', {className:'col'},'col')
			])
		]);
  }
}