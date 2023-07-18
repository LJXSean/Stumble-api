import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link, useParams } from 'react-router-dom';
import './profile.css';
import ProfileSidebar from './ProfileSidebar';
import ProfileCarousel from './ProfileCarousel';
import ProfileGithub from './ProfileGithub';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProjectCards from './ProjectCards';

// props.match used to get the params from the URL

const projects = [
  {
    title: 'Project1',
    description:
      'IPson Ladus the avae kedavra IPson Ladus the avae kedavra \
      IPson Ladus the avae kedavra IPson Ladus the avae kedavra \
      IPson Ladus the avae kedavra IPson Ladus the avae kedavra \
      IPson Ladus the avae kedavra IPson Ladus the avae kedavra',
    tags: ['Android'],
  },
  {
    title: 'Project2',
    description: 'IPson Ladus the avae kedavra',
    tags: ['Android'],
  },
  {
    title: 'Project3',
    description: 'IPson Ladus the avae kedavra',
    tags: ['Android'],
  },
  {
    title: 'Project4',
    description: 'IPson Ladus the avae kedavra',
    tags: ['Android'],
  },
  {
    title: 'Project5',
    description: 'IPson Ladus the avae kedavra',
    tags: ['Android'],
  },
];
const Profile = ({ getProfileById, profile: { profile, isLoading }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <section>
      {profile === null || isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className='p-top-background'>
            <div className='p-top'>
              <Link to='/profiles' className='btn btn-light'>
                Back to Profiles
              </Link>
              {auth.isAuthenticated &&
                auth.isLoading === false &&
                auth.user._id === profile.user._id && (
                  <Link to='/edit-profile' className='btn btn-dark'>
                    Edit Profile
                  </Link>
                )}
              <ProfileCarousel />
            </div>
          </div>

          <div className='layout'>
            <ProfileSidebar profile={profile} />
            <div className='layout-main'>
              <p className='projects'>Projects</p>

              <div className='p-card-container'>
                {projects.map((project, index) => (
                  <ProjectCards key={index} project={project} />
                ))}
              </div>

              <div className='bottom'>
                <div className='p-bottom bg-white p-2'>
                  <h2 className='text-primary'>Experience</h2>
                  {profile.experience.length > 0 ? (
                    <>
                      {profile.experience.map((experience) => (
                        <ProfileExperience
                          key={experience._id}
                          experience={experience}
                        ></ProfileExperience>
                      ))}
                    </>
                  ) : (
                    <h4>No experience credentials</h4>
                  )}
                </div>

                <div className='p-bottom bg-white p-2'>
                  <h2 className='text-primary'>Education</h2>
                  {profile.education.length > 0 ? (
                    <>
                      {profile.education.map((education) => (
                        <ProfileEducation
                          key={education._id}
                          education={education}
                        ></ProfileEducation>
                      ))}
                    </>
                  ) : (
                    <h4>No experience credentials</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
