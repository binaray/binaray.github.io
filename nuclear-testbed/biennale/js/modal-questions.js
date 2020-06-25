class CloseButton extends React.Component {
  render() {
    return e(
      'a',
      {
        href: '#',
        className: 'modal_close_button p-3',
        /*style:{color:'black',float:'right'},*/ onClick: () =>
          setModalState(null),
      },
      [e('i', { className: 'material-icons icon' }, 'remove')]
    );
  }
}

class BeginButton extends React.Component {
  render() {
    return e(
      'svg',
      {
        width: '243',
        height: '45',
        viewBox: '0 0 243 45',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        onClick: () => setModalState('question1'),
      },
      e('rect', {
        x: '0.5',
        y: '0.5',
        width: '242',
        height: '44',
        rx: '21',
        fill: 'white',
        stroke: '#E90006',
      }),
      e('path', {
        d:
          'M97.9668 29V14.7812H102.84C104.448 14.7812 105.672 15.1035 106.512 15.748C107.352 16.3926 107.771 17.3529 107.771 18.6289C107.771 19.2799 107.596 19.8659 107.244 20.3867C106.893 20.9076 106.378 21.3112 105.701 21.5977C106.469 21.806 107.062 22.1999 107.479 22.7793C107.902 23.3522 108.113 24.0423 108.113 24.8496C108.113 26.1842 107.684 27.2096 106.824 27.9258C105.971 28.6419 104.747 29 103.152 29H97.9668ZM100.438 22.584V27.0273H103.182C103.956 27.0273 104.562 26.8353 104.998 26.4512C105.434 26.0671 105.652 25.5332 105.652 24.8496C105.652 23.3717 104.897 22.6165 103.387 22.584H100.438ZM100.438 20.7676H102.859C103.628 20.7676 104.227 20.5951 104.656 20.25C105.092 19.8984 105.311 19.4036 105.311 18.7656C105.311 18.0625 105.109 17.5547 104.705 17.2422C104.308 16.9297 103.686 16.7734 102.84 16.7734H100.438V20.7676ZM115.008 29.1953C113.504 29.1953 112.283 28.7233 111.346 27.7793C110.415 26.8288 109.949 25.5658 109.949 23.9902V23.6973C109.949 22.6426 110.151 21.7018 110.555 20.875C110.965 20.0417 111.538 19.3939 112.273 18.9316C113.009 18.4694 113.829 18.2383 114.734 18.2383C116.173 18.2383 117.283 18.6973 118.064 19.6152C118.852 20.5332 119.246 21.832 119.246 23.5117V24.4688H112.342C112.413 25.3411 112.703 26.0312 113.211 26.5391C113.725 27.0469 114.37 27.3008 115.145 27.3008C116.232 27.3008 117.117 26.8613 117.801 25.9824L119.08 27.2031C118.657 27.8346 118.09 28.3262 117.381 28.6777C116.678 29.0228 115.887 29.1953 115.008 29.1953ZM114.725 20.1426C114.074 20.1426 113.546 20.3704 113.143 20.8262C112.745 21.2819 112.492 21.9167 112.381 22.7305H116.902V22.5547C116.85 21.7604 116.639 21.1615 116.268 20.7578C115.896 20.3477 115.382 20.1426 114.725 20.1426ZM120.682 23.6387C120.682 21.998 121.066 20.6895 121.834 19.7129C122.609 18.7298 123.634 18.2383 124.91 18.2383C126.115 18.2383 127.062 18.6582 127.752 19.498L127.859 18.4336H129.998V28.6777C129.998 30.0645 129.565 31.1582 128.699 31.959C127.84 32.7598 126.678 33.1602 125.213 33.1602C124.438 33.1602 123.68 32.9974 122.938 32.6719C122.202 32.3529 121.642 31.9329 121.258 31.4121L122.381 29.9863C123.11 30.8522 124.008 31.2852 125.076 31.2852C125.864 31.2852 126.486 31.0703 126.941 30.6406C127.397 30.2174 127.625 29.5924 127.625 28.7656V28.0527C126.941 28.8145 126.03 29.1953 124.891 29.1953C123.654 29.1953 122.641 28.7038 121.854 27.7207C121.072 26.7376 120.682 25.377 120.682 23.6387ZM123.045 23.8438C123.045 24.9049 123.26 25.7415 123.689 26.3535C124.126 26.959 124.728 27.2617 125.496 27.2617C126.453 27.2617 127.163 26.8516 127.625 26.0312V21.3828C127.176 20.582 126.473 20.1816 125.516 20.1816C124.734 20.1816 124.126 20.4909 123.689 21.1094C123.26 21.7279 123.045 22.6393 123.045 23.8438ZM134.969 29H132.596V18.4336H134.969V29ZM132.449 15.6895C132.449 15.3249 132.563 15.0221 132.791 14.7812C133.025 14.5404 133.357 14.4199 133.787 14.4199C134.217 14.4199 134.549 14.5404 134.783 14.7812C135.018 15.0221 135.135 15.3249 135.135 15.6895C135.135 16.0475 135.018 16.347 134.783 16.5879C134.549 16.8223 134.217 16.9395 133.787 16.9395C133.357 16.9395 133.025 16.8223 132.791 16.5879C132.563 16.347 132.449 16.0475 132.449 15.6895ZM139.764 18.4336L139.832 19.6543C140.613 18.7103 141.639 18.2383 142.908 18.2383C145.109 18.2383 146.229 19.498 146.268 22.0176V29H143.895V22.1543C143.895 21.4837 143.748 20.9889 143.455 20.6699C143.169 20.3444 142.697 20.1816 142.039 20.1816C141.082 20.1816 140.369 20.6146 139.9 21.4805V29H137.527V18.4336H139.764Z',
        fill: '#E90006',
      })
    );
  }
}
class Line extends React.Component {
  render() {
    return e(
      'svg',
      {
        width: '140',
        height: '1',
        viewBox: '0 0 140 1',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      e('line', {
        x1: '-2.18557e-08',
        y1: '0.75',
        x2: '140',
        y2: '0.749988',
        stroke: '#E90006',
        strokeWidth: '0.5',
      })
    );
  }
}

class LivArrangement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your preferred living arrangement: '
      ),
      e('div', { className: 'row q_option_name' }, ' \xA0'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/0_cohabitation/Single.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Single'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/CoupleWoChildren.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Couple'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/SingleParentFamily.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1SParent'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Nuclear.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Nuclear'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Cohousing.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Cohousing'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Assisted.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Assisted'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/MultiGenerational.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Multi'),
        }),
      ]),
    ]);
  }
}

class LivArrangementSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your preferred living arrangement: '
      ),
      e('div', { className: 'row q_option_name' }, 'SINGLE'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/0_cohabitation/Single.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Single'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/CoupleWoChildren.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Couple'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/SingleParentFamily.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1SParent'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Nuclear.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Nuclear'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Cohousing.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Cohousing'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Assisted.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Assisted'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/MultiGenerational.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Multi'),
        }),
      ]),
      e(
        'div',
        { className: 'q_buttonContainer' },
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question2'),
        })
      ),
    ]);
  }
}
class LivArrangementCouple extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your preferred living arrangement: '
      ),
      e('div', { className: 'row q_option_name' }, 'COUPLE W/O CHILDREN'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/0_cohabitation/Single.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Single'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/CoupleWoChildren.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Couple'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/SingleParentFamily.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1SParent'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Nuclear.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Nuclear'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Cohousing.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Cohousing'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Assisted.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Assisted'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/MultiGenerational.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Multi'),
        }),
      ]),
      e(
        'div',
        { className: 'q_buttonContainer' },
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question2'),
        })
      ),
    ]);
  }
}
class LivArrangementSParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your preferred living arrangement: '
      ),
      e('div', { className: 'row q_option_name' }, 'SINGLE PARENT'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/0_cohabitation/Single.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Single'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/CoupleWoChildren.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Couple'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/SingleParentFamily.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1SParent'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Nuclear.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Nuclear'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Cohousing.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Cohousing'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Assisted.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Assisted'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/MultiGenerational.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Multi'),
        }),
      ]),
      e(
        'div',
        { className: 'q_buttonContainer' },
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question2'),
        })
      ),
    ]);
  }
}
class LivArrangementNuclear extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your preferred living arrangement: '
      ),
      e('div', { className: 'row q_option_name' }, 'NUCLEAR'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/0_cohabitation/Single.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Single'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/CoupleWoChildren.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Couple'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/SingleParentFamily.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1SParent'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Nuclear.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Nuclear'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Cohousing.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Cohousing'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Assisted.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Assisted'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/MultiGenerational.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Multi'),
        }),
      ]),
      e(
        'div',
        { className: 'q_buttonContainer' },
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question2'),
        })
      ),
    ]);
  }
}
class LivArrangementCohousing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your preferred living arrangement: '
      ),
      e('div', { className: 'row q_option_name' }, 'FLATSHARE / CO-HOUSING'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/0_cohabitation/Single.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Single'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/CoupleWoChildren.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Couple'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/SingleParentFamily.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1SParent'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Nuclear.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Nuclear'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Cohousing.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Cohousing'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Assisted.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Assisted'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/MultiGenerational.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Multi'),
        }),
      ]),
      e(
        'div',
        { className: 'q_buttonContainer' },
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question2'),
        })
      ),
    ]);
  }
}
class LivArrangementAssisted extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your preferred living arrangement: '
      ),
      e('div', { className: 'row q_option_name' }, 'ASSISTED LIVING'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/0_cohabitation/Single.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Single'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/CoupleWoChildren.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Couple'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/SingleParentFamily.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1SParent'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Nuclear.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Nuclear'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Cohousing.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Cohousing'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Assisted.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Assisted'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/MultiGenerational.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Multi'),
        }),
      ]),
      e(
        'div',
        { className: 'q_buttonContainer' },
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question2'),
        })
      ),
    ]);
  }
}
class LivArrangementMulti extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your preferred living arrangement: '
      ),
      e(
        'div',
        { className: 'row q_option_name' },
        'MULTI-GENERATION / EXTENDED FAMILY'
      ),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/0_cohabitation/Single.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Single'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/CoupleWoChildren.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Couple'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/SingleParentFamily.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1SParent'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Nuclear.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Nuclear'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Cohousing.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Cohousing'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/Assisted.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question1Assisted'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/0_cohabitation/MultiGenerational.png',
          className: 'q_options_item',
          onClick: () => setModalState('question1Multi'),
        }),
      ]),
      e(
        'div',
        { className: 'q_buttonContainer' },
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question2'),
        })
      ),
    ]);
  }
}

class AgeGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your age group: '
      ),
      e('div', { className: 'row q_option_name' }, ' \xA0'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/1_AgeGroup/Youth.png',
          className: 'q_options_item',
          onClick: () => setModalState('question2Youth'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/1_AgeGroup/Midlife.png',
          className: 'q_options_item',
          onClick: () => setModalState('question2Mid'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/1_AgeGroup/Elderly.png',
          className: 'q_options_item',
          onClick: () => setModalState('question2Eld'),
        }),
      ]),
    ]);
  }
}

class AgeGroupYouth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your age group: '
      ),
      e('div', { className: 'row q_option_name' }, 'YOUTH & ADULT | <40'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/1_AgeGroup/Youth.png',
          className: 'q_options_item',
          onClick: () => setModalState('question2Youth'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/1_AgeGroup/Midlife.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question2Mid'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/1_AgeGroup/Elderly.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question2Eld'),
        }),
      ]),
      e('div', { className: 'q_buttonContainer' }, [
        // e('input', { type: 'button', value: 'Previous' }),
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question3'),
        }),
      ]),
    ]);
  }
}

class AgeGroupMidlife extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your age group: '
      ),
      e('div', { className: 'row q_option_name' }, 'MIDLIFE | 40 - 60'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/1_AgeGroup/Youth.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question2Youth'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/1_AgeGroup/Midlife.png',
          className: 'q_options_item',
          onClick: () => setModalState('question2Mid'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/1_AgeGroup/Elderly.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question2Eld'),
        }),
      ]),
      e('div', { className: 'q_buttonContainer' }, [
        // e('input', { type: 'button', value: 'Previous' }),
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question3'),
        }),
      ]),
    ]);
  }
}

class AgeGroupElderly extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Choose your age group: '
      ),
      e('div', { className: 'row q_option_name' }, 'ELDERLY | >60'),

      e('div', { className: 'q_options' }, [
        e('img', {
          src: 'images/questions/1_AgeGroup/Youth.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question2Youth'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/1_AgeGroup/Midlife.png',
          className: 'q_options_item q_deselect_img',
          onClick: () => setModalState('question2Mid'),
        }),
        e('div', { className: 'q_break' }),
        e('img', {
          src: 'images/questions/1_AgeGroup/Elderly.png',
          className: 'q_options_item',
          onClick: () => setModalState('question2Eld'),
        }),
      ]),
      e('div', { className: 'q_buttonContainer' }, [
        // e('input', { type: 'button', value: 'Previous' }),
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question3'),
        }),
      ]),
    ]);
  }
}

class Capacity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'How many people are living in this unit? (including yourself) '
      ),
      e(
        'div',
        { className: 'q_sliderContainer' },
        e(MaterialUI.Slider, {
          defaultValue: 1,
          step: 1,
          valueLabelDisplay: 'on',
          max: 10,
          color: 'secondary',
        })
      ),
      e('div', { className: 'q_buttonContainer' }, [
        // e('input', { type: 'button', value: 'Previous' }),
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question4'),
        }),
      ]),
    ]);
  }
}

class Affordable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        'Do you want an affordable unit? '
      ),
      e('div', { className: 'q_buttonContainer q_yesno' }, [
        e('input', {
          type: 'button',
          value: 'Yes',
          onClick: () => setModalState('question5'),
        }),
        e('input', {
          type: 'button',
          value: 'No',
          onClick: () => setModalState('question5'),
        }),
      ]),
      // e('div', { className: 'q_buttonContainer' }, [
      //   e('input', { type: 'button', value: 'Previous' }),
      //   e('input', { type: 'button', value: 'Next' }),
      // ]),
    ]);
  }
}

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      single: 0,
      shared: 0,
      study: 0,
      availableSelections: [0, 1, 2, 3, 4, 5, 6],
    };

    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.handleChangeC = this.handleChangeC.bind(this);
  }

  handleChangeA(event) {
    this.setState({ single: parseInt(event.target.value) });
  }

  handleChangeB(event) {
    this.setState({ shared: parseInt(event.target.value) });
  }

  handleChangeC(event) {
    this.setState({ study: parseInt(event.target.value) });
  }

  render() {
    const { single, shared, study, availableSelections } = this.state;
    const optionsA = availableSelections.filter(
      (num) => parseInt(shared) + parseInt(study) + num <= 6
    );
    const optionsB = availableSelections.filter(
      (num) => parseInt(single) + parseInt(study) + num <= 6
    );
    const optionsC = availableSelections.filter(
      (num) => parseInt(single) + parseInt(shared) + num <= 6
    );
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e(
        'div',
        {
          className: 'q_welcome q_padding_body',
        },
        'Welcome User#555 to year 2050!'
      ),
      e(
        'div',
        {
          className: 'q_choose',
        },
        [
          'Select your required rooms:',
          e('br', null),
          '(Note: You can only have a maximum of 6 rooms)',
        ]
      ),
      e(
        'div',
        {
          className: 'q_room',
        },
        e(
          'form',
          {
            onSubmit: this.handleSubmit,
          },
          e(
            'label',
            { className: 'q_roomchoice' },
            'Single Bedrooms: ',
            e(
              'select',
              {
                value: single,
                onChange: this.handleChangeA,
              },
              optionsA.map((num) =>
                e(
                  'option',
                  {
                    key: num,
                    value: num.toString(),
                  },
                  num
                )
              )
            )
          ),
          e('br', null),
          e(
            'label',
            { className: 'q_roomchoice' },
            'Shared Bedrooms: ',
            e(
              'select',
              {
                value: shared.toString(),
                onChange: this.handleChangeB,
              },
              optionsB.map((num) =>
                e(
                  'option',
                  {
                    key: num,
                    value: num.toString(),
                  },
                  num
                )
              )
            )
          ),
          e('br', null),
          e(
            'label',
            { className: 'q_roomchoice' },
            'Studyrooms: ',
            e(
              'select',
              {
                value: study.toString(),
                onChange: this.handleChangeC,
              },
              optionsC.map((num) =>
                e(
                  'option',
                  {
                    key: num,
                    value: num.toString(),
                  },
                  num
                )
              )
            )
          )
        )
      ),
      e('div', { className: 'q_buttonContainer' }, [
        // e('input', { type: 'button', value: 'Previous' }),
        e('input', {
          type: 'button',
          value: 'Next',
          onClick: () => setModalState('question4'),
        }),
      ]),
    ]);
  }
}

class ModalQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: 'questionnaire' };
  }

  render() {
    return e('div', { className: 'modal_window container-fluid' }, [
      e(CloseButton),
      e('div', { className: 'row p-2 q_title' }, [
        e('div', { className: 'q_padding' }, 'Future Hybrid Highrise Commune'),
        e(Line, { className: 'q_padding' }),
        e('div', { className: 'q_break' }),
        e(
          'div',
          { className: 'q_subtitle q_padding' },
          'How will we live together?'
        ),
      ]),
      e(
        'div',
        { className: 'q_body q_padding_body' },
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laborisLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris '
      ),
      e(
        'div',
        {
          className: 'q_button q_padding_body',
        },
        e(BeginButton)
      ),
    ]);
  }
}
