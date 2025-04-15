import React, { useState } from 'react';
import './ContactForm.css'; // Certifique-se de importar o CSS corretamente

const Contact = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="section over-hide">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section text-center py-5 py-md-0">
              <input
                className="pricing"
                type="checkbox"
                id="pricing"
                name="pricing"
                checked={checked}
                onChange={handleChange}
              />
              <label htmlFor="pricing">
                <span className="block-diff">
                  Contact
                  <span className="float-right">Feedback</span>
                </span>
              </label>
              <div className="card-3d-wrap mx-auto">
                <div
                  className="card-3d-wrapper"
                  style={{
                    transform: checked ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 700ms 400ms ease-out',
                  }}
                >
                  {/* Formulário de Contato - Frente */}
                  <div className="card-front">
                    <div className="pricing-wrap">
                      <h4 className="mb-5">Contact Us</h4>
                      <form action="#">
                        <div className="input">
                          <input type="text" id="name" className="input__field" placeholder=" " />
                          <label htmlFor="name" className="input__label">Name</label>
                        </div>
                        <div className="input">
                          <input type="email" id="email" className="input__field" placeholder=" " />
                          <label htmlFor="email" className="input__label">Email</label>
                        </div>
                        <div className="input">
                          <textarea id="message" className="input__field" placeholder=" "></textarea>
                          <label htmlFor="message" className="input__label">Message</label>
                        </div>
                        {/* Aqui está o botão com a classe button_contact */}
                        <a href="#" className="button button_contact">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          Submit
                        </a>
                      </form>
                    </div>
                  </div>
  
                  {/* Formulário de Avaliação - Verso */}
                  <div className="card-back">
                    <div className="pricing-wrap">
                      <h4 className="mb-5">Leave Feedback</h4>
                      <form action="#">
                        <div className="input">
                          <select id="rating" className="input__field">
                            <option value="" disabled selected hidden></option>
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Terrible</option>
                          </select>
                          <label htmlFor="rating" className="input__label">Rating</label>
                        </div>
                        <div className="input">
                          <textarea id="comments" className="input__field" placeholder=" "></textarea>
                          <label htmlFor="comments" className="input__label">Comments</label>
                        </div>
                        {/* Botão de feedback com a classe button_notes */}
                        <a href="#" className="button button_notes">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          Submit
                        </a>
                      </form>
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Contact;
