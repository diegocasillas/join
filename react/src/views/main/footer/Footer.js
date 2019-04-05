import React, { Component } from 'react'
import './footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="Footer container-fluid">

                <div className="row shadow-sm">
                    <div className="col white box-size text-right">
                        <p className="p-logo">Join</p>
                    </div>
                    <div className="col-10 white-transparent box-size text-left">
                        <h6 className="disclaimer-text">Disclaimer:</h6>
                        <p className="disclaimer-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur, arcu id pharetra ultricies, felis nulla pulvinar nulla, at sodales justo justo ac lorem. Donec tempus ut risus aliquet laoreet. <br />
                            Nulla efficitur augue non facilisis venenatis. Donec nisi ex, eleifend eget nisl at, auctor vehicula ex. Mauris tortor mi, dictum non consequat vel, varius scelerisque augue.</p>
                    </div>

                </div>

            </div>
        )
    }
}

export default Footer
