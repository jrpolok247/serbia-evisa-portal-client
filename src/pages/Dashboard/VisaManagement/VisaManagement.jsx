import { useEffect, useState } from "react";
import {
  Space,
  Table,
  Popconfirm,
  Button,
  Modal,
  Input,
  Form,
  message,
  Skeleton,
  Select,
} from "antd";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useCreateVisaMutation,
  useDeleteVisaMutation,
  useGetAllVisaQuery,
  useUpdateVisaMutation,
} from "../../../redux/api/visa/visaApi";
import { BsEye } from "react-icons/bs";

const VisaManagement = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const { data: visaData, refetch, isLoading, } = useGetAllVisaQuery(pagination);
  const [deleteVisa, { isLoading: deleteVisaIsLoading }] = useDeleteVisaMutation();
  const [createVisa, { isLoading: createVisaIsLoading }] =
    useCreateVisaMutation();
  const [updateVisa, { isLoading: updateVisaIsLoading }] =
    useUpdateVisaMutation();
  const [editingVisa, setEditingVisa] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [isViewDetailsModalVisible, setIsViewDetailsModalVisible] =
    useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  //   Update input value
  useEffect(() => {
    if (editingVisa) {
      form.setFieldsValue({
        userImg: editingVisa.userImg,
        applicationId: editingVisa.applicationId,
        dateOfApplication: editingVisa.dateOfApplication,
        surName: editingVisa.surName,
        name: editingVisa.name,
        dob: editingVisa.dob,
        sex: editingVisa.sex,
        travelDocumentNumber: editingVisa.travelDocumentNumber,
        validityStart: editingVisa.validityStart,
        validityEnd: editingVisa.validityEnd,
        duration: editingVisa.duration,
        numberOfentries: editingVisa.numberOfentries,
        grantDecisionNumber: editingVisa.grantDecisionNumber,
        grantDecisionDate: editingVisa.grantDecisionDate,
        eVisaId: editingVisa.eVisaId,
        eVisaVerificationCode: editingVisa.eVisaVerificationCode,
        passportNumber: editingVisa.passportNumber
      });
    } else {
      form.resetFields();
    }
  }, [editingVisa, form]);

  const handleAddToVisa = async (values) => {
    try {
      const res = await createVisa({ ...values }).unwrap();
      message.success(res?.message || "Visa successfully created!", 1.5);
      refetch();
      form.resetFields()
      setModalVisible(false);
    } catch (error) {
      message.error(error.data?.message || "Visa created failed!", 1.5);
    }
  };

  const handleUpdateVisa = async (values) => {
    try {
      const res = await updateVisa({
        ...values,
        _id: editingVisa?._id,
      }).unwrap();

      message.success(res?.message || "Visa successfully updated!", 1.5);
      refetch();
      setModalVisible(false);
    } catch (error) {
      message.error(error.message || "Visa update failed!", 1.5);
    }
  };

  const handleDeleteVisa = async (id) => {
    try {
      const res = await deleteVisa(id._id).unwrap();
      message.success(res.data?.message || "Visa successfully deleted!", 1.5);
      refetch();
    } catch (error) {
      message.error(error.data?.message || "Visa delete failed!", 1.5);
    }
  };

  const handleModalCancel = () => {
    setEditingVisa(null);
    setModalVisible(false);
    form.resetFields();
  };

  const openModalForEditing = (record) => {
    setEditingVisa(record);
    setModalVisible(true);
  };

  // View details modal
  const showViewDetailsModal = (record) => {
    setSelectedRecord(record);
    setIsViewDetailsModalVisible(true);
  };
  const handleViewDetailsModalCancel = () => {
    setIsViewDetailsModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      dataIndex: "userImg",
      title: "User Image",
      key: "userImg",
      render: (text, record) => (
        <img
          src={record.userImg}
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Application ID",
      dataIndex: "applicationId",
      key: "applicationId",
    },
    {
      title: "Date Of Application",
      dataIndex: "dateOfApplication",
      key: "dateOfApplication",
    },
    {
      title: "Visa ID",
      dataIndex: "eVisaId",
      key: "eVisaId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surName",
      key: "surname",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<BsEye />}
            onClick={() => showViewDetailsModal(record)}
          >
            View
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<MdDriveFileRenameOutline />}
            onClick={() => openModalForEditing(record)}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this Visa?"
            onConfirm={() => handleDeleteVisa(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<RiDeleteBin6Line />}
              type="primary"
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const visaUploadFormData = [
    {
      name: "userImg",
      label: "User Image",
      placeholder: "Enter user image URL",
      type: "text"
    },
    {
      name: "dateOfApplication",
      label: "Date of Application",
      placeholder: "Enter date of application",
      type: "text"
    },
    {
      name: "surName",
      label: "Surname",
      placeholder: "Enter surname",
      type: "text"
    },
    {
      name: "name",
      label: "Name",
      placeholder: "Enter name",
      type: "text"
    },
    {
      name: "dob",
      label: "Date of Birth",
      placeholder: "Enter date of birth",
      type: "text"
    },
    {
      name: "sex",
      label: "Sex",
      placeholder: "Select sex",
      type: "select",
      options: [{value: 'MALE', label: 'Male'}, {value: 'FEMALE', label: 'Female'}, {value: 'OTHER', label: "Other"}]
    },
    {
      name: "travelDocumentNumber",
      label: "Travel Document Number",
      placeholder: "Enter travel document number",
      type: "text"
    },
    {
      name: "validityStart",
      label: "Validity Start",
      placeholder: "Enter validity start date",
      type: "text"
    },
    {
      name: "validityEnd",
      label: "Validity End",
      placeholder: "Enter validity end date",
      type: "text"
    },
    {
      name: "duration",
      label: "Duration",
      placeholder: "Enter duration",
      type: "text"
    },
    {
      name: "numberOfentries",
      label: "Number of Entries",
      placeholder: "Enter number of entries",
      type: "text"
    },
    {
      name: "grantDecisionNumber",
      label: "Grant Decision Number",
      placeholder: "Enter grant decision number",
      type: "text"
    },
    {
      name: "grantDecisionDate",
      label: "Grant Decision Date",
      placeholder: "Enter grant decision date",
      type: "text"
    },
    {
      name: "passportNumber",
      label: "Passport Number",
      placeholder: "Enter passport number",
      type: "text"
    }
  ];


  console.log(isLoading, visaData, 'VisaData');

  return (
    <div>
      <div className="my-container space-y-12 md:space-y-16">
        <div className="flex justify-end mr-5 my-5">
          {isLoading ? (
            <Skeleton.Input active={true} />
          ) : (
            <Button
              onClick={() => {
                setEditingVisa(null);
                setModalVisible(true);
              }}
              type="primary"
              size="middle"
              icon={<MdDriveFileRenameOutline />}
            >
              Add Visa
            </Button>
          )}
        </div>
        {isLoading ? (
          <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <Table
            dataSource={visaData?.data}
            columns={columns}
            rowKey="_id"
            scroll={{ x: 800 }}
            pagination={{
              total: visaData?.meta?.total,
              onChange: (page, pageSize) => {
                setPagination({ page, pageSize });
              },
            }}
          />
        )}
        {/* Update modal */}
        <Modal
          title={editingVisa ? "Update Visa" : "Add Visa"}
          open={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form
            form={form}
            name="serbiaEVisaForm"
            onFinish={editingVisa ? handleUpdateVisa : handleAddToVisa}
            layout="vertical"
            className="max-h-[600px] overflow-y-scroll pr-2"
          >
            {visaUploadFormData?.map((elem, ind) => {
              if (elem.type === 'text') {
                return (
                  <Form.Item
                    key={ind}
                    label={elem.label}
                    name={elem.name}
                    rules={[
                      {
                        required: editingVisa ? false : true,
                        message: `Please enter ${elem.label}`,
                      },
                    ]}
                  >
                    <Input placeholder={elem.placeholder} />
                  </Form.Item>
                );
              }
              if (elem.type === 'select') {
                return (
                  <Form.Item
                    key={ind}
                    label={elem.label}
                    name={elem.name}
                    rules={[
                      {
                        required: editingVisa ? false : true,
                        message: `Please enter ${elem.label}`,
                      },
                    ]}
                  >
                    <Select options={elem.options} placeholder={elem.placeholder} />
                  </Form.Item>
                );
              }


            })}

            <Form.Item>
              {editingVisa ? (
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={updateVisaIsLoading}
                >
                  {" "}
                  Update Visa
                </Button>
              ) : (
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={createVisaIsLoading}
                >
                  Add Visa
                </Button>
              )}
            </Form.Item>
          </Form>
        </Modal>

        {/* View details modal */}
        <Modal
          // title="Contact Us Details"
          onCancel={handleViewDetailsModalCancel}
          onOk={handleViewDetailsModalCancel}
          open={isViewDetailsModalVisible}
        >
          {selectedRecord && (
            <div className="space-y-2">
              <h2 className="font-bold text-xl md:text-2xl text-center !mb-4">
                Visa details
              </h2>

              <p className="flex gap-1 flex-wrap">
                <strong>Date Of Birth:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.dob}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Sex:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.sex}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Travel Document Number:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.travelDocumentNumber}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Validity:</strong>
                <p className="text-normal-desc">{selectedRecord.validityStart} - {selectedRecord.validityEnd}</p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Duration:</strong>
                <p className="text-normal-desc">{selectedRecord.duration}</p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Number of Entries:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.numberOfentries
                  }
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Grant Decision Number:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.grantDecisionNumber}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>grantDecisionDate:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.grantDecisionDate}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Visa Verificaton Code:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.eVisaVerificationCode}
                </p>
              </p>

              <p className="flex gap-1 flex-wrap">
                <strong>Passport Number:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.passportNumber}
                </p>
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default VisaManagement;
