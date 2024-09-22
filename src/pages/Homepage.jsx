import { Button, Form, Input, message } from "antd";
import Container from "../Components/ui/Container";
import { RiVisaFill } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import pdfHeader from '../assets/pdfHeader.png'
import qrCode from '../assets/qrcode.png'
import pdfFooter from '../assets/pdfBottom.png'
import { useLazyGetSingleVisaQuery } from "../redux/api/visa/visaApi";

const Homepage = () => {
  const [form] = Form.useForm();
  const [getSingleVisa, { data, isLoading }] = useLazyGetSingleVisaQuery()
  const visaData = data?.data || {}

  const printContentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
    documentTitle: `serbia-evisa-portal-${visaData?.eVisaId}`,
    // onBeforePrint: () => {console.log("before printing...");},
    // onAfterPrint: () => {console.log("after printing...");},
    removeAfterPrint: false,
  });



  const handleSubmitId = async ({ id }) => {

    try {

      const visa = await getSingleVisa(id).unwrap()
      if (visa.success) {
        message.success(visa.message)
      }
    }
    catch (e) {
      message.error(e.data?.message)
    }
  }

  const fullName = `${visaData.surName}<<${visaData.name?.split(' ')?.join('<')}`;
  const minLength = 35; // or whatever minimum length is required for the first line to be full
  const fillLength = minLength - fullName.length;
  const fillString = '<'.repeat(fillLength);
  

  return (
    <Container>
      {!data ? <div className="my-4 mb-8 !px-[20px] sm:!px-[50px] md:!px-[110px] p-8 rounded-md border border-primary pb-[120px]">
        <div className="flex gap-2 items-center">
          <span className="bg-primary rounded-full text-white text-xl p-2"><RiVisaFill /></span>
          <h2 className="flex-1 border-b border-primary text-xl text-primary font-semibold">Portal of Serbia e-Visa</h2>
        </div>

        <Form form={form} layout="vertical"
          className="my-4"
          name="eVisaIdForm"
          //  style={{ maxWidth: 600 }}
          onFinish={handleSubmitId}
          autoComplete="off"
        >
          <Form.Item
            label="e-Visa ID"
            name="id"
            rules={[{ required: true, message: 'Please input your ID!' }]}
          >
            <Input placeholder="Enter ID here" className="w-[200px] rounded-none" />
          </Form.Item>

          <Button loading={isLoading} size="large" htmlType="submit" className="secondary-btn rounded-none ml-auto">Confirm <FaAngleRight /></Button>

        </Form>
      </div>
        :
        <div className="my-4 mb-8 !px-[20px] sm:!px-[50px] md:!px-[110px] p-8 rounded-md border border-primary flex items-center justify-center">

          <div className="text-center">
            <h2 className="font-bold text-xl">Your visa is ready to view!</h2>
            <button
              type="submit"
              onClick={() => {
                handlePrint();
              }}
              className="primary-btn !mx-auto !mt-2"
            >
              Print
            </button>
          </div>

          {/* Component to be print */}
          <div
            className={`font-bold bg-white min-h-screen text-black text-center print-content-font }`}
            id="printContent"
            ref={printContentRef}
          >
            <div className="mx-[60px] py-4 space-y-3 !text-[13px]">
              {/* Header */}
              <img src={pdfHeader} alt="Serbia eVisa portal" />

              {/* Sub header */}
              <div className="px-[13px]">
                <h2>ОБАВЕШТЕЊЕ О ДОДАВАЊУ Е-ВИЗЕ</h2>
                <h2>NOTIFICATION OF GRANTING AN E-VISA</h2>
              </div>

              {/* visa data*/}
              <div className="relative overflow-x-auto mb-6 mt-2 text-slate-800 font-normal space-y-[2px] !text-left">

                {/* Детаљи апликације/ Application details  + Ово је да обавестите е-визу која је издата/ This is to inform an e-visa issued to */}
                <div className="flex justify-between gap-4">

                  <div className="font-semibold space-y-1">
                    <h2 className="font-bold">Детаљи апликације/ Application details</h2>
                    <div className="flex gap-4">
                      <h2 className="bg-gray w-[280px] leading-[16px] p-1">ид апликације/ <br />
                        Application ID</h2>
                      <p>{visaData.applicationId}</p>
                    </div>
                    <div className="flex gap-4">
                      <h2 className="bg-gray w-[280px] p-1 leading-[16px]">Датум подношења захтева/ <br /> Date of Application
                      </h2>
                      <p>{visaData.dateOfApplication}</p>
                    </div>

                    <h2 className="font-bold leading-[16px]">Ово је да обавестите е-визу која је издата/ <br /> This is to inform an e-visa issued to</h2>

                    <div className="flex gap-4">
                      <h2 className="bg-gray w-[280px]">Презиме/ Surname</h2>
                      <p>{visaData.surName}</p>
                    </div>
                    <div className="flex gap-4">
                      <h2 className="bg-gray w-[280px]">Име / Given name(s)</h2>
                      <p>{visaData.name}</p>
                    </div>
                    <div className="flex gap-4">
                      <h2 className="bg-gray w-[280px]">Датум рођења / Date of birth(s)</h2>
                      <p>{visaData.dob}</p>
                    </div>
                    <div className="flex gap-4">
                      <h2 className="bg-gray w-[280px]">Сек / Sex</h2>
                      <p>{visaData.sex}</p>
                    </div>
                    <div className="flex gap-4">
                      <h2 className="bg-gray w-[280px]">националност / Nationality</h2>
                      <p>Bangladeshi</p>
                    </div>
                    <div className="flex gap-4">
                      <h2 className="bg-gray w-[280px] p-1 leading-[16px] ">Број путне исправе / <br />
                        Travel document number</h2>
                      <p>{visaData.travelDocumentNumber}</p>
                    </div>

                  </div>

                  <img src={visaData?.userImg || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" className="w-[150px] h-[150px]" alt="serbia eVisa portal'} className="h-[180px] w-[145px]  border-2 border-slate-700" />
                </div>


                {/* Детаљи о е-визама / E-visa details */}
                <div className="font-semibold space-y-1">
                  <h2 className="font-bold">Детаљи о е-визама / E-visa details</h2>
                  <div className="flex gap-4">
                    <h2 className="bg-gray w-[280px] p-1 leading-[16px]">Важење е-визе / E-visa validity</h2>
                    <div className="flex items-center gap-8">
                    <p>{visaData.validityStart}</p>
                    <p>{visaData.validityEnd}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray w-[280px] p-1 leading-[16px]">Трајање боравка (дана) / <br /> Duration of stay (days)</h2>
                    <p>{visaData.duration}</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray w-[280px] p-1 leading-[16px]"> Број уноса / <br />
                    Number of Entries</h2>
                    <p>{visaData.numberOfentries}</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray w-[280px] p-1 leading-[16px]">Категорија електронске визе / Category of electronic visa</h2>
                    <p>РАД / WORK</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray w-[280px] p-1 leading-[16px]">Број одлуке о додели е-визе / <br /> E-visa grant decision number</h2>
                    <p>{visaData.grantDecisionNumber}</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray w-[280px] p-1 leading-[16px]"> Датум одлуке о додели е-визе / <br /> E-visa grant decision date</h2>
                    <p>{visaData.grantDecisionDate}</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray w-[280px]"> Е-виза Ид / E-visa ID</h2>
                    <p>{visaData.eVisaId}</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray w-[280px] p-1 leading-[16px]">код за верификацију е-визе / <br /> E-visa Verification Code</h2>
                    <p>{visaData.eVisaVerificationCode}</p>
                  </div>
                </div>


              </div>

              {/* PDF footer */}
              <div className="text-[16px]">


                <div className="flex justify-between items-center gap-2 my-6">
                  <img src={qrCode} alt="Serbia eVisa portal" className="h-[140px] w-[140px]" />

                  <div className="!font-semibold text-black text-left space-y-4">
                    <p style={{ wordSpacing: '20px' }} className="leading-[16px]">Молимо понесите ОВО обавештење ca собом И покажите транспортну фирму ради провере е-визе.</p>

                    <p style={{ wordSpacing: '18px' }} className="leading-[16px]">Please bring this notification with you and show transport company for a e-visa check.</p>

                    <p className="font-normal leading-[16px] !tracking-widest">
                      {/* TODO: name can be replace space to < */}
                      {/* V{"<"}BGD {visaData.surName}{"<<"}{visaData.name?.split(' ').join('<')}{"<<<<<<<<<<<<<"} */}
                      {`V<BGD${fullName}${fillString}`}
                      <br/>
                      {visaData.passportNumber}
                    </p>

                  </div>
                </div>
                <img src={pdfFooter} alt="" />
              </div>


            </div>
          </div>
        </div>
      }

    </Container>

  );
};

export default Homepage;
