import React ,{ useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';


const EditProfile = ({profile:{profile, loading }, createProfile, getCurrentProfile, history,  }) => {
    const [formData, setFormData] = useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        githubusername:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    });
    const [displaySocialInputs,toggleSocialInputs] = useState(false);

    useEffect(() => {
       getCurrentProfile();
       setFormData({
        company:loading || !profile.company ? '' : profile.company,
            website:loading || !profile.website ? '' : profile.website,
            location:loading || !profile.location ? '' : profile.location,
            status:loading || !profile.status ? '' : profile.status,
            skills:loading || !profile.skills ? '' : profile.skills,
            githubusername:loading || !profile.githubusername ? '' : profile.githubusername,
            bio:loading || !profile.bio ? '' : profile.bio,
            twitter:loading || !profile.social.twitter ? '' : profile.social.twitter,
            facebook:loading || !profile.social.facebook ? '' : profile.social.facebook,
            linkedin:loading || !profile.social.linkedin ? '' : profile.social.linkedin,
            youtube:loading || !profile.social.youtube ? '' : profile.social.youtube,
            instagram:loading || !profile.social.instagram ? '' : profile.social.instagram
       });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history,true);
        scrollToTop();
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
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your profile stand out
            </p>
            <small>
                * = required field
            </small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <select name="status" value={status} onChange={onChange}>
                        <option value="0">Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student fo Learning">Student fo Learning</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={onChange}/>
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={onChange}/>
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange}/>
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange}/>
                    <small className="form-text">
                        Please use comma separated values (eg. HTML, CSS, JavaScript, PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Github UserName" name="githubusername" value={githubusername} onChange={onChange}/>
                    <small className="form-text">
                        If you want latest repos and a Github link, include your username
                    </small>
                </div>
                <div className="form-group">
                    <textarea name="bio" id="" cols="30" rows="10" placeholder="A short bio of yourself" value={bio} onChange={onChange}></textarea>
                    <small className="form-text">
                        Tell us a little about yourself
                    </small>
                </div>
                <div className="my-2">
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type="button"
                        className="btn btn-light"
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs &&
                <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="Youtube URL" name="youtube" value={youtube} onChange={onChange}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange}/>
                    </div>
                </Fragment>}

                <input type="submit" className="btn btn-primary my-1" value="Submit"/>
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
            </form>
        </Fragment>
    )
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));

