import { Ecommerce } from "@/components/miscs/ContextEcommerceProvider";
import Axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import nookies from 'nookies'
import nProgress from "nprogress";
import notify from "@/components/miscs/notify";

const Profile = () => {
    const [formChanged, setFormChanged] = React.useState(false);
    const { user } = React.useContext(Ecommerce);
    const [ dataToSend, setDataToSend ] = React.useState({})
    const {jwt} = nookies.get(null)
    const changeDetected = (e) => {
        setDataToSend({ ...dataToSend, [e.target.name]: e.target.value })
        setFormChanged(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const headers = { headers: { 'Authorization': 'Bearer ' + jwt } };
        nProgress.start()
        try{
            await Axios.put(process.env.serverUrl + '/users/' + user.id, dataToSend, headers)
            nProgress.done()
            notify({ title: 'Амжилттай хадгалагдлаа.', type: 'success' })
            setFormChanged(false)
        } catch(e) {
            console.log(e, 'error in /checkout/address - Profile update')
            nProgress.done()
            notify({ title: 'Амжилттай Алдаа гарлаа.', type: 'denger' })
            setFormChanged(false)
        }
    }
    return (
        <form className="section_wrap" onChange={changeDetected} onSubmit={handleSubmit}>
            <div className="top">
                <h5>Захиалагчийн мэдээлэл</h5>
            </div>
            <div className="row">
                <div className="col-md-6 box">
                    <label>Нэр</label>
                    <input type="text" name="firstname" defaultValue={user.firstname} required />
                </div>
                <div className="col-md-6 box">
                    <label>Овог</label>
                    <input type="text" name="lastname" defaultValue={user.lastname} required />
                </div>
                <div className="col-md-6 box">
                    <label>Имэйл</label>
                    <input disabled={true} type="text" name="email" defaultValue={user.email} required />
                </div>
                <div className="col-md-6 box">
                    <label>Утасны дугаар</label>
                    <input type="number" name="phone" defaultValue={user.phone} required />
                </div>
                <div className="col-md-6 box">
                    <AnimatePresence>
                        {formChanged && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                            >
                                <button type="submit">
                                    Хадгалах <AiOutlineCheck />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </form>
    );
};

export default Profile;
