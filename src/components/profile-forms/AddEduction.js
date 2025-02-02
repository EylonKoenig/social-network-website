import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from "../../actions/profile";

const AddEducation = ({addEducation, history}) => {
    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:'',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});


    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
        scrollToTop()
    };

    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    };
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add an Education
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Add any school or bootcamp that you have attended
            </p>
            <small>* = required</small>
            <form className="form"
                  onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="School or Bootcamp" name="school" value={school} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={onChange}  required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange}/>
                </div>
                {!toDateDisabled &&
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date"
                           name="to"
                           value={to}
                           onChange={onChange}
                           disabled={toDateDisabled ? 'disabled': ''}/>
                </div>
                }
                <div className="form-group">
                    <p>
                        <input type="checkbox"
                               name="current"
                               value={current}
                               onChange={e => {
                                   setFormData({...formData, current:!current});
                                   toggleDisabled(!toDateDisabled);
                               }}/>
                        {' '}Current School
                    </p>
                </div>
                <div className="form-group">
                    <textarea name="description" id="" cols="30" rows="5" placeholder="Program Description" value={description} onChange={onChange}>
                    </textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Submit"/>
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
            </form>
        </Fragment>
    )
};

AddEducation.propTypes = {
    AddEducation: PropTypes.func.isRequired
};

export default connect(null,{ addEducation })(withRouter(AddEducation));