import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from "../../actions/profile";

const AddExperience = ({addExperience, history}) => {
    const [formData,setFormData] = useState({
        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:'',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});


    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
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
                Add an Experience
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Add any developer/programing positions that you have had in the past
            </p>
            <small>* = required</small>
            <form className="form"
                  onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange}  required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange}/>
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
                        {' '}Current Job
                    </p>
                </div>
                <div className="form-group">
                    <textarea name="description" id="" cols="30" rows="5" placeholder="Job Description" value={description} onChange={onChange}>
                    </textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Submit"/>
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
            </form>
        </Fragment>
    )
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
};

export default connect(null,{ addExperience })(withRouter(AddExperience));