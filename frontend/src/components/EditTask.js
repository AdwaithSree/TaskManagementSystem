import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import axios from 'axios';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import Navbar from './Navbar';

import {
  toast,
} from 'react-toastify';


function EditTask() {

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem('token');


  const [formData, setFormData] =
    useState({

      title:'',
      description:'',
      status:'Pending',
      priority:'Medium',
      deadline:'',

    });


  /* FETCH TASK */

  const fetchTask = useCallback(async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/tasks/${id}/`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );

      setFormData(response.data);

    }

    catch(error){

      console.log(error);

    }

  }, [id, token]);


  useEffect(() => {

    fetchTask();

  }, [fetchTask]);


  /* HANDLE CHANGE */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };


  /* UPDATE TASK */

  const handleSubmit = async(e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://127.0.0.1:8000/api/tasks/${id}/`,
        formData,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      toast.success(
        'Task Updated Successfully'
      );


      navigate('/dashboard');

    }

    catch(error){

      toast.error(
        'Task Update Failed'
      );

      console.log(error);

    }

  };


  return (

    <div className="app">

      <div className="page-container">

        <Navbar />


        <div className="panel">

          <div
            className="panel-title"
            style={{
              marginBottom:'28px',
            }}
          >

            Update Task

          </div>


          <form onSubmit={handleSubmit}>


            {/* TITLE */}

            <div className="input-group">

              <label className="input-label">

                Title

              </label>

              <input
                type="text"
                name="title"
                className="input-field"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="input-group">

              <label className="input-label">

                Description

              </label>

              <textarea
                name="description"
                className="input-field"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>

            </div>


            {/* STATUS */}

            <div className="input-group">

              <label className="input-label">

                Status

              </label>

              <select
                name="status"
                className="input-field"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="Pending">

                  Pending

                </option>

                <option value="In Progress">

                  In Progress

                </option>

                <option value="Completed">

                  Completed

                </option>

              </select>

            </div>


            {/* PRIORITY */}

            <div className="input-group">

              <label className="input-label">

                Priority

              </label>

              <select
                name="priority"
                className="input-field"
                value={formData.priority}
                onChange={handleChange}
              >

                <option value="Low">

                  Low

                </option>

                <option value="Medium">

                  Medium

                </option>

                <option value="High">

                  High

                </option>

              </select>

            </div>


            {/* DEADLINE */}

            <div className="input-group">

              <label className="input-label">

                Deadline

              </label>

              <input
                type="date"
                name="deadline"
                className="input-field"
                value={formData.deadline}
                onChange={handleChange}
                required
              />

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="primary-btn"
            >

              Update Task

            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default EditTask;