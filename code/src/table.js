import React, { useEffect, useState } from "react";
import styles from "./styles/Index.module.css";
import {
    Button,
    Dropdown,
    Input,
    Menu,
    Select,
    Spin,
    Col,
    Row,
    notification,
    message,
} from "antd";
import * as EmailValidator from "email-validator";
import Pagination from "./../components/pagination";
import Modal from "./../components/Modal";

function JsonTable() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [singleUser, setSingleUser] = useState({});
    const [updateUser, setUpdateUser] = useState(false);
    const [values, setValues] = useState({
        name: "",
        email: "",
        u_name: "",
        u_email: "",
    });

    // Create Controller
    useEffect(() => {
        GetUsers();
    }, []);

    const Validation = () => {
        if (!values.name || values.name === "") {
            message.error({
                content: "Name is invalid!",
                style: {
                    marginTop: "5vh",
                },
            });

            return;
        }
        if (!values.email || values.email === "") {
            message.error({
                content: "Email can not be empty!",
                style: {
                    marginTop: "5vh",
                },
            });

            return;
        }
        if (!EmailValidator.validate(values.email)) {
            message.error({
                content: "Submit a valid Email address",
                style: {
                    marginTop: "5vh",
                },
            });
            return;
        }
        CreateUser();
    };

    const CreateUser = async () => {
        try {
            fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((res) => {
                    if (res.status !== 201) {
                        return;
                    } else {
                        return res.json();
                    }
                })
                .then((data) => {
                    setUsers((json) => [...json, data]);
                    openNotification({
                        type: "success",
                        title: "Successful",
                        description: "User successfully created",
                        placement: "topLeft",
                    });

                    console.log(users);
                });

            setValues({
                name: "",
                email: "",
            });
        } catch (err) {
            console.log(err);
        }
    };
    // Create Controller End

    // Read Controller
    const GetUsers = async () => {
        try {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((response) => response.json())
                .then((json) => setUsers(json));
        } catch (err) {
            console.log(err);
        }
    };

    // Read Controller END

    // Update Controller
    const UpdateUser = async () => {
        try {
            fetch(
                `https://jsonplaceholder.typicode.com/users/${singleUser?.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        name: values.u_name || singleUser.name,
                        email: values.u_email || singleUser.email,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            ).then((res) => {
                if (res.status !== 200) {
                    return;
                } else {
                    setUsers(
                        users.sort((user) => {
                            return user.id === singleUser?.id;
                        })
                    );
                    console.log({ users });

                    openNotification({
                        type: "success",
                        title: "Successful",
                        description: "User successfully updated",
                        placement: "topLeft",
                    });
                    setUpdateUser(false);
                }
            });
            setValues({
                u_name: "",
                email: "",
            });
        } catch (err) {
            console.log(err);
        }
    };
    // Create Controller End

    // Delete Controller

    const DeleteUser = async () => {
        try {
            await fetch(
                `https://jsonplaceholder.typicode.com/users/${singleUser?.id}`,
                {
                    method: "DELETE",
                }
            ).then((res) => {
                if (res.status !== 200) {
                    return;
                } else {
                    setUsers(
                        users.filter((user) => {
                            return user.id !== singleUser?.id;
                        })
                    );
                    openNotification({
                        type: "success",
                        title: "Successful",
                        description: "User successfully deleted",
                        placement: "topLeft",
                    });
                    setUpdateUser(false);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    // Delete Controller End

    const handleClose = () => {
        setShowModal(false);
    };

    // DELETE MODAL
    const deleteModal = (
        <Modal visible={showModal} onCancel={handleClose}>
            <div style={{ position: "absolute", left: "-9999px" }}> </div>
            <div className={styles.modal_img}></div>
            <h3 className={styles.modal_h3}>
                Do you want to{" "}
                <span style={{ color: "#ff0000", fontSize: "14px" }}>
                    DELETE{" "}
                </span>
                User with ID:{" "}
                <span style={{ color: "#ff0000", fontSize: "14px" }}>
                    {singleUser?.id}
                </span>
                ?
            </h3>

            <div className={styles.modal_btns}>
                <button
                    onClick={() => {
                        DeleteUser(),
                            setTimeout(() => {
                                !handleClose();
                            }, 500);
                    }}
                    className={styles.delete}
                >
                    Delete
                </button>
                <button
                    className={styles.reverse}
                    onClick={() => !handleClose()}
                >
                    Reverse
                </button>
            </div>
        </Modal>
    );
    // DELETE MODAL END

    const openNotification = (dataObject) => {
        notification.open({
            type: dataObject.type,
            message: `${dataObject.title}`,
            description: dataObject.description,
            placement: dataObject.placement,
        });
    };

    // For PAGINATION
    // Get current Users
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const indexOfLastData = currentPage * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const TableData = users?.slice(indexOfFirstData, indexOfLastData);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // For PAGINATION ends

    return (
        <div className={styles.back}>
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    <div className={styles.tableContainer}>
                        <div className={styles.tableContent}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan="100%">
                                                {" "}
                                                <div className={styles.loader}>
                                                    <p>No record found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        users.length !== 0 &&
                                        TableData.map((x, i) => (
                                            <tr key={x.id}>
                                                {/* <td>{x.id}</td> */}
                                                <td
                                                    className={
                                                        styles.break__Word
                                                    }
                                                >
                                                    {x?.name}
                                                </td>
                                                <td
                                                    className={
                                                        styles.break__Word
                                                    }
                                                >
                                                    {x?.email}
                                                </td>
                                                <td>
                                                    <div
                                                        className={
                                                            styles.actions
                                                        }
                                                    >
                                                        <button
                                                            className={
                                                                styles.update
                                                            }
                                                            overlay={x}
                                                        >
                                                            <span
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault(),
                                                                        setSingleUser(
                                                                            x
                                                                        ),
                                                                        setTimeout(
                                                                            () => {
                                                                                setUpdateUser(
                                                                                    true
                                                                                );
                                                                            },
                                                                            500
                                                                        );
                                                                }}
                                                            >
                                                                Update
                                                            </span>
                                                        </button>
                                                        <button
                                                            className={
                                                                styles.delete
                                                            }
                                                            overlay={x}
                                                        >
                                                            <span
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault(),
                                                                        setSingleUser(
                                                                            x
                                                                        ),
                                                                        setUpdateUser(
                                                                            false
                                                                        ),
                                                                        setTimeout(
                                                                            () => {
                                                                                setShowModal(
                                                                                    true
                                                                                );
                                                                            },
                                                                            500
                                                                        );
                                                                }}
                                                            >
                                                                Delete
                                                            </span>
                                                        </button>{" "}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>{" "}
                        </div>
                        {users.length !== 0 && (
                            <Pagination
                                pageSize={pageSize}
                                total={users?.length}
                                paginate={paginate}
                            />
                        )}
                    </div>
                </Col>
                <Col lg={6} sm={12}>
                    <div className={styles.inputs}>
                        <label htmlFor="update_country">CREATE </label>
                        <div className={styles.transInfo}>
                            <h3>Name</h3>{" "}
                            <Input
                                type="text"
                                value={values.name}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        name: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className={styles.transInfo}>
                            <h3>Email</h3>{" "}
                            <Input
                                type="email"
                                value={values.email}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        email: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <button
                            className={styles.btn}
                            onClick={() => Validation()}
                        >
                            Create
                        </button>
                    </div>
                    {updateUser && (
                        <div className={styles.inputs}>
                            <label htmlFor="update_country">UPDATE </label>
                            <div className={styles.transInfo}>
                                <h3>Name</h3>{" "}
                                <Input
                                    type="text"
                                    placeholder={singleUser?.name}
                                    value={values.u_name}
                                    onChange={(e) => {
                                        setValues({
                                            ...values,
                                            u_name: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className={styles.transInfo}>
                                <h3>Email</h3>{" "}
                                <Input
                                    type="email"
                                    placeholder={singleUser?.email}
                                    value={values.u_email}
                                    onChange={(e) => {
                                        setValues({
                                            ...values,
                                            u_email: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <button
                                className={styles.btn}
                                onClick={() => UpdateUser()}
                            >
                                Update
                            </button>
                        </div>
                    )}
                </Col>
            </Row>
            {showModal === true && deleteModal}
        </div>
    );
}

export default JsonTable;
