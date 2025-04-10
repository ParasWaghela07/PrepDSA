import React, { useEffect, useState } from 'react';
import TechQst from '../components/TechQst';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
const TechLanding = () => {
    const [alltechquestion,setalltechquestion]=useState();
    const [alltags,setalltags]=useState();

    const [isTagsModelOpen,setisTagsModelOpen]=useState(false);
    const [tags,settags]=useState([]);
    const [techquestion,settechquestion]=useState([]);

    const [searchInput, setsearchInput] = useState("");

    const searchQuestions = (qsts) => {
        const filteredQuestions = qsts?.filter((question) =>
          question.question.toLowerCase().includes(searchInput.toLowerCase())
        );
        settechquestion(filteredQuestions?.length === 0 ? [] : filteredQuestions);
      };
    
      useEffect(() => {
        filterQuestions(true);
      }, [searchInput]);

    const toggleSelection = (arr, setArray, value) => {
        setArray((prev) =>
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
      };

      function checkTag(question, tags) {
        for (let i = 0; i < question.tags.length; i++) {
          if (tags.includes(question.tags[i].tag_name)) {
            return true;
          }
        }
        return false;
      }

    async function getAllTechQuestions(){
        const toastid=toast.loading('Loading...');
        try {
            const response = await fetch("http://localhost:4000/getAllTechQuestions");
            const data = await response.json();
            // console.log(data);
            settechquestion(data.data);
            setalltechquestion(data.data);
          }
          catch (error) {
            console.error("Error fetching questions:", error);
          }
          toast.dismiss(toastid);
    }

    async function getAllTags(){
        try{
            const response=await fetch('http://localhost:4000/getAllTags');
            const data=await response.json();
            // console.log(data);

            if(data.success){
                setalltags(data.data);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        getAllTechQuestions();
        getAllTags();
    },[])

    useEffect(()=>{
      filterQuestions();
    },[tags]);

    function filterQuestions(flag=false) {

        // console.log(tags);
    
        let filteredQuestions = alltechquestion
    
        if (tags?.length > 0) {
          filteredQuestions = filteredQuestions.filter((question) =>
            checkTag(question, tags)
          );
      }
      settechquestion(filteredQuestions?.length === 0 ? [] : filteredQuestions);
      if(flag===true) searchQuestions(filteredQuestions);
    }


    return (
  <div className="min-h-screen w-full bg-gray-900 text-gray-100 px-4 sm:px-6">
    <div className="w-full flex flex-col sm:flex-row justify-center items-center py-5 gap-4 sm:gap-x-10">
      <div
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
        onClick={() => setisTagsModelOpen(true)}
      >
        <div className="flex justify-between items-center w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-2 py-2">
          <p>Select Tags</p>
        </div>
      </div>

      <input
        type="text"
        value={searchInput}
        onChange={(e) => setsearchInput(e.target.value)}
        placeholder="Search question"
        className="w-full sm:w-[50%] md:w-[30%] p-2 bg-gray-700 border border-gray-300 rounded-lg focus:outline-none"
      />
    </div>



          {/* HERE */}

          <div className='p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
  {techquestion?.length > 0 ? (
    techquestion?.map((qst, index) => <TechQst question={qst} key={index} />)
  ) : (
    <p className='font-bold text-2xl'>No Questions Found</p>
  )}
</div>


        <Modal
        isOpen={isTagsModelOpen}
        onClose={() => setisTagsModelOpen(false)}
        title="Select Tags"
        options={alltags?.map((tag)=>tag.tag_name)}
        selectedOptions={tags}
        toggleOption={(value) => toggleSelection(tags, settags, value)}
      />
        </div>
    );
};

export default TechLanding;