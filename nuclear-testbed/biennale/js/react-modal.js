const e = React.createElement;
const openModalbuttons = document.getElementById('open_modal_buttons');
const questionsRoot = document.getElementById('questions_modal_container');
const messageRoot = document.getElementById('message_modal_container');

class CloseButton extends React.Component {
  render() {
	return e('a', {href:this.props.href, className:'a_btn p-2',style:{color:'black',float:'right'}, onClick: () => setModalState(null) }, [
		e('h3',null,this.props.btnText)
	]);
  }
}

function setModalState(mode,props=null){
	switch (mode){
		case 'questions':
			messageRoot.style.opacity=0;
			questionsRoot.style.opacity=0;
			questionsRoot.style.display = "block";
			setTimeout(
				function(){
					messageRoot.style.display = "none";
					questionsRoot.style.opacity=1;
				},100);
			ReactDOM.render(
				e(ModalQuestions),
				questionsRoot
			);
			break;
		case 'comment':
			questionsRoot.style.opacity=0;
			messageRoot.style.opacity=0;
			messageRoot.style.display = "block";
			setTimeout(
				function(){
					questionsRoot.style.display = "none";
					messageRoot.style.opacity=1;
				},100);
			break;
		default:
			questionsRoot.style.opacity=0;
			messageRoot.style,opacity=0;
			setTimeout(
				function(){
					questionsRoot.style.display = "none";
					messageRoot.style.display = "none";
				},100);
	}
}
setModalState(null);