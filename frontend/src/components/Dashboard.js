import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';

import axios from 'axios';

import {
  useNavigate,
} from 'react-router-dom';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import {
  toast,
} from 'react-toastify';

import Navbar from './Navbar';


function Dashboard() {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('All');

  const [priorityFilter, setPriorityFilter] =
    useState('All');

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedTaskId, setSelectedTaskId] =
    useState(null);


  /* FETCH TASKS */

  const fetchTasks = useCallback(async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/tasks/',
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);

    }

    catch(error){

      console.log(error);

      localStorage.removeItem('token');

      toast.error(
        'Session Expired. Login Again'
      );

      navigate('/');

    }

    finally{

      setLoading(false);

    }

  }, [token, navigate]);


 useEffect(() => {

  fetchTasks();

  if(
    Notification.permission
    !==
    'granted'
  ){

    Notification.requestPermission();

  }

}, [fetchTasks]);


  /* OPEN DELETE MODAL */

  const openDeleteModal = (id) => {

    setSelectedTaskId(id);

    setShowDeleteModal(true);

  };


  /* CLOSE DELETE MODAL */

  const closeDeleteModal = () => {

    setShowDeleteModal(false);

    setSelectedTaskId(null);

  };


  /* DELETE TASK */

  const deleteTask = async() => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/tasks/${selectedTaskId}/`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );

      await fetchTasks();

      toast.success('Task Deleted');

      closeDeleteModal();

    }

    catch(error){

      toast.error('Delete Failed');

      console.log(error);

    }

  };


  /* FILTER TASKS */

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All'
      ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'All'
      ||
      task.priority === priorityFilter;

    return (
      matchesSearch
      &&
      matchesStatus
      &&
      matchesPriority
    );

  });
 


  /* DEADLINE COLORS */

  const getDeadlineClass = (deadline) => {

    const today = new Date();

    const dueDate = new Date(deadline);

    const difference = dueDate - today;

    const days =
      Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
      );

    if(days < 0){

      return 'deadline-overdue';

    }

    if(days <= 3){

      return 'deadline-warning';

    }

    return 'deadline-safe';

  };


  /* CHART DATA */

  const chartData = [

    {
      name:'Pending',
      value:
      tasks.filter(
        (task) => task.status === 'Pending'
      ).length,
    },

    {
      name:'In Progress',
      value:
      tasks.filter(
        (task) =>
          task.status === 'In Progress'
      ).length,
    },

    {
      name:'Completed',
      value:
      tasks.filter(
        (task) =>
          task.status === 'Completed'
      ).length,
    },

  ];


  const COLORS = [
    '#f59e0b',
    '#3b82f6',
    '#10b981',
  ];


  /* LOADING */
  useEffect(() => {

  if(
    !(
      'Notification'
      in
      window
    )
  ){

    return;

  }


  if(
    Notification.permission
    !==
    'granted'
  ){

    return;

  }


  tasks.forEach((task) => {

    if(

      !task.deadline

      ||

      task.status
      ===
      'Completed'

    ){

      return;

    }


    const now =
      new Date();

    const deadline =
      new Date(
        task.deadline
      );


    const difference =
      deadline
      -
      now;


    const hours =
      difference
      /
      (
        1000
        *
        60
        *
        60
      );


    if(
      hours <= 24
      &&
      hours > 0
    ){

     setTimeout(()=>{

new Notification(

'⏰ Task Reminder',

{

body:
`${task.title} deadline is near.`

}

);

},100);

      

    }

  });

}, [tasks]);

  if(loading){

    return (

      <div className="loader-wrapper">

        <div className="loader"></div>

      </div>

    );

  }


  return (

    <div className="app">

      <div className="page-container">

        <Navbar />


        {/* HERO */}

        <div className="hero">

          <h1>

            Your Workspace

          </h1>

          <p>

            Stay productive with a clean,
            modern workflow experience.

          </p>

        </div>


        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-title">

              Total Tasks

            </div>

            <div className="stat-number">

              {tasks.length}

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-title">

              Completed

            </div>

            <div className="stat-number">

              {
                tasks.filter(
                  (task) =>
                    task.status === 'Completed'
                ).length
              }

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-title">

              In Progress

            </div>

            <div className="stat-number">

              {
                tasks.filter(
                  (task) =>
                    task.status === 'In Progress'
                ).length
              }

            </div>

          </div>

        </div>


        {/* ANALYTICS */}

        <div
          className="panel"
          style={{
            marginBottom:'30px',
          }}
        >

          <div
            className="panel-title"
            style={{
              marginBottom:'20px',
            }}
          >

            Task Analytics

          </div>


          <div
            style={{
              width:'100%',
              height:'320px',
            }}
          >

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={110}
                  innerRadius={70}
                  paddingAngle={4}
                  label={false}
                  labelLine={false}
                >

                  {
                    chartData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />

                      )
                    )
                  }

                </Pie>


                <Tooltip
                  contentStyle={{
                    background:'#111827',
                    border:'none',
                    borderRadius:'14px',
                    color:'#fff',
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* FILTERS */}

        <div
          className="filter-bar"
          style={{
            display:'flex',
            gap:'16px',
            marginBottom:'26px',
            flexWrap:'wrap',
          }}
        >

          <input
            type="text"
            placeholder="Search tasks..."
            className="input-field"
            style={{
              maxWidth:'320px',
            }}
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          <select
            className="input-field"
            style={{
              maxWidth:'220px',
            }}
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="All">

              Status

            </option>

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


          <select
            className="input-field"
            style={{
              maxWidth:'220px',
            }}
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >

            <option value="All">

              Priority

            </option>

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


        {/* EMPTY STATE */}

        {
          filteredTasks.length === 0
          &&
          (
            <div className="empty-state">

              <div className="empty-icon">

                🚀

              </div>


              <h2>

                Start Managing Your Workflow

              </h2>


              <p>

                Organize tasks, track deadlines,
                and boost productivity with a
                clean and intelligent workspace
                built for efficient task management.

              </p>


              <button
                className="primary-btn"
                onClick={() =>
                  navigate('/create-task')
                }
              >

                Create Your First Task

              </button>

            </div>
          )
        }


        {/* TASK LIST */}

        {
          filteredTasks.length > 0
          &&
          (
            <div className="panel">

              <div className="panel-header">

                <div className="panel-title">

                  Recent Tasks

                </div>

              </div>


              <div
                style={{
                  display:'flex',
                  flexDirection:'column',
                  gap:'18px',
                }}
              >

                {
                  filteredTasks.map((task) => (

                    <div
                      key={task.id}
                      className="task-card"
                    >

                      <div
                        style={{
                          display:'flex',
                          justifyContent:'space-between',
                          alignItems:'flex-start',
                          gap:'20px',
                          flexWrap:'wrap',
                        }}
                      >

                        {/* LEFT */}

                        <div
                          style={{
                            flex:'1',
                            minWidth:'260px',
                          }}
                        >

                          <div
                            style={{
                              fontSize:'22px',
                              fontWeight:'700',
                              marginBottom:'10px',
                            }}
                          >

                            {task.title}

                          </div>


                          <div
                            style={{
                              color:'#9ca3af',
                              lineHeight:'1.7',
                              marginBottom:'18px',
                            }}
                          >

                            {task.description}

                          </div>


                          <div
                            style={{
                              display:'flex',
                              gap:'12px',
                              flexWrap:'wrap',
                            }}
                          >

                            <span
                              className={
                                task.status === 'Completed'
                                ? 'status completed'
                                : task.status === 'In Progress'
                                ? 'status progress'
                                : 'status pending'
                              }
                            >

                              {
                                task.status === 'Pending'
                                &&
                                '⏳ Pending'
                              }

                              {
                                task.status === 'In Progress'
                                &&
                                '🚀 In Progress'
                              }

                              {
                                task.status === 'Completed'
                                &&
                                '✅ Completed'
                              }

                            </span>


                            <span
                              className={
                                task.priority === 'High'
                                ? 'high'
                                : task.priority === 'Medium'
                                ? 'medium'
                                : 'low'
                              }
                            >

                              {
                                task.priority === 'High'
                                &&
                                '🔴 High'
                              }

                              {
                                task.priority === 'Medium'
                                &&
                                '🟡 Medium'
                              }

                              {
                                task.priority === 'Low'
                                &&
                                '🟢 Low'
                              }

                            </span>

                          </div>

                        </div>


                        {/* RIGHT */}

                        <div
                          style={{
                            textAlign:'right',
                          }}
                        >

                          <div
                            className={
                              getDeadlineClass(
                                task.deadline
                              )
                            }
                            style={{
                              marginBottom:'18px',
                              fontSize:'14px',
                              fontWeight:'600',
                            }}
                          >

                            Deadline:
                            {' '}
                            {task.deadline}

                          </div>


                          <div
                            style={{
                              display:'flex',
                              gap:'10px',
                            }}
                          >

                            <button
                              className="primary-btn"
                              style={{
                                padding:'10px 16px',
                                fontSize:'13px',
                              }}
                              onClick={() =>
                                navigate(
                                  `/edit-task/${task.id}`
                                )
                              }
                            >

                              Edit

                            </button>


                            <button
                              className="logout-btn"
                              onClick={() =>
                                openDeleteModal(task.id)
                              }
                            >

                              Delete

                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  ))
                }

              </div>

            </div>
          )
        }


        {/* DELETE MODAL */}

        {
          showDeleteModal
          &&
          (
            <div className="modal-overlay">

              <div className="delete-modal">

                <h2>

                  Delete Task?

                </h2>

                <p>

                  Are you sure you want
                  to permanently delete
                  this task?

                </p>


                <div className="modal-buttons">

                  <button
                    className="logout-btn"
                    onClick={closeDeleteModal}
                  >

                    Cancel

                  </button>


                  <button
                    className="primary-btn"
                    onClick={deleteTask}
                  >

                    Confirm Delete

                  </button>

                </div>

              </div>

            </div>
          )
        }

      </div>

    </div>

  );
}

export default Dashboard;