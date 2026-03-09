import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./ViewerDashboard.css"; // For custom styles

// Import all images from assets/components
import SmartCity from "../../assets/Smart-City.jpg";
import solarPlant from "../../assets/Solar.jpg";
import Rural from "../../assets/Rural.jpg";
import Coridor from "../../assets/Coridor.jpg";

function ViewerDashboard() {
  // Sample project data
  const allProjects = [
    {
      id: 1,
      title: "Smart City Road Development Project",
      description:
        "Upgradation of city roads with smart lighting, drainage, and pedestrian pathways under the Smart Cities Mission.",
      department: "Urban Development Department",
      budget: "₹150 Crore",
      deadline: "30 Sept 2025",
      image: SmartCity,
    },
    {
      id: 2,
      title: "Solar Power Plant Installation",
      description:
        "Establishment of a 50MW solar power plant to boost renewable energy production and reduce carbon footprint.",
      department: "Ministry of New and Renewable Energy",
      budget: "₹200 Crore",
      deadline: "15 Nov 2025",
      image: solarPlant,
    },
    {
      id: 3,
      title: "Rural Water Supply Scheme",
      description:
        "Ensuring clean drinking water supply to 500 villages using modern filtration and distribution systems.",
      department: "Public Health Engineering Department",
      budget: "₹80 Crore",
      deadline: "10 Dec 2025",
      image: Rural, // Replace with your actual local image if needed
    },
    {
      id: 4,
      title: "High-Speed Rail Corridor",
      description:
        "Construction of a high-speed rail line between major cities to boost connectivity and reduce travel time.",
      department: "Ministry of Railways",
      budget: "₹1,000 Crore",
      deadline: "31 Jan 2026",
      image: Coridor, // Replace with your actual local image if needed
    },
  ];

  // State for search, filter, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  // Filter + Search Logic
  const filteredProjects = allProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterDept === "" || project.department === filterDept)
  );

  // Pagination Logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <>
      <Helmet>
        <title>Viewer Dashboard - GovTenders Portal</title>
        <meta
          name="description"
          content="Browse current government tenders and projects with search, filters, and pagination."
        />
      </Helmet>

      <div className="container mt-4">
        <h1 className="text-center mb-4 fw-bold text-primary">
          📢 Current Government Projects
        </h1>

        {/* Search & Filter */}
        <div className="row mb-4">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-2">
            <select
              className="form-select"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="">All Departments</option>
              {[...new Set(allProjects.map((p) => p.department))].map(
                (dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Project Cards */}
        <div className="row">
          {currentProjects.map((project) => (
            <div key={project.id} className="col-md-6 mb-4">
              <div className="card project-card h-100">
                <img
                  src={project.image}
                  className="card-img-top"
                  alt={project.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Department:</strong> {project.department}
                    </li>
                    <li>
                      <strong>Budget:</strong> {project.budget}
                    </li>
                    <li>
                      <strong>Deadline:</strong> {project.deadline}
                    </li>
                  </ul>
                  <button className="btn btn-success w-100">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container text-center mt-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn ${
                  currentPage === index + 1
                    ? "btn-primary"
                    : "btn-outline-primary"
                } mx-1`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ViewerDashboard;
