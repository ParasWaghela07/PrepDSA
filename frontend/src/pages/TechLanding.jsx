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
        <div>
            <div
            className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
            onClick={() => setisTagsModelOpen(true)}
          >
            <label className="block text-sm font-medium">Tags</label>
            <div className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md">
              Select Tags
            </div>
          </div>

          <input
          type="text"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
          placeholder="Search question"
          className="w-[30%] p-2 bg-gray-700 border border-gray-300 rounded-lg focus:outline-none"
        />

          <button className='p-2 bg-black text-white font-bold text-xl m-2 rounded-md'
          onClick={filterQuestions}
          >Filter</button>

            {techquestion?.length>0 ?(
                techquestion?.map((qst,index)=>{
                    return <TechQst question={qst} key={index}/>
                })
            ):(<p>No Questions Found</p>)}

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