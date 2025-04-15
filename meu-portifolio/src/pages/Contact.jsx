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
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Your Email"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="message">Message</label>
                          <textarea
                            id="message"
                            className="form-control"
                            placeholder="Your Message"
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Formulário de Avaliação - Verso */}
                  <div className="card-back">
                    <div className="pricing-wrap">
                      <h4 className="mb-5">Leave Feedback</h4>
                      <form action="#">
                        <div className="form-group">
                          <label htmlFor="rating">Rating</label>
                          <select id="rating" className="form-control">
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Terrible</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="comments">Comments</label>
                          <textarea
                            id="comments"
                            className="form-control"
                            placeholder="Your Feedback"
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Submit Feedback
                        </button>
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
