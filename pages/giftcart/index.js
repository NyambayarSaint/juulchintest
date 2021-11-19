import React from 'react';

const GiftCard = () => {

    return (
        <div>
            <div className ="container">
                <div className="row">
                    <div className ="col-md-6">
                        <div className="giftcart">
                            <div className="h-100 p-5 text-white bg-dark rounded-3">
                                <h2>Олон улсын аялалын даатгал</h2>
                                <p>200$ хүртэл даатгалын хамгаалалт</p>
                                <button className="btn btn-outline-light" type="button">Example button</button>
                            </div>
                        </div>
                    </div>
                    <div className ="col-md-6">
                        <h2>Төрсөн өдрийн бэлгийн карт</h2>
                        <hr/>
                        <div className="total-price">Үнийн дүн: <strong>50.000₮</strong></div>
                        <form>
                            <div className="priceTag">
                                <button>20.000₮</button>
                                <button>20.000₮</button>
                                <button>20.000₮</button>
                                <button>20.000₮</button>
                                <button>20.000₮</button>
                            </div>
                            <div className="total-price">Хүлээн авагчийн мэдээлэл</div>
                                <div className="row">
                                    <div className ="col-md-6 col-sm-6">
                                            <label for="firstName" className="form-label">Хүлээн авагчийн нэр</label>
                                            <input type="text" className="form-control" id="firstName" placeholder="" value="" reqiured=""></input>
                                    </div>                                
                                    <div className ="col-md-6 col-sm-6">
                                            <label for="firstName" className="form-label">Илгээгч</label>
                                            <input type="text" className="form-control" id="firstName" placeholder="" value="" required=""></input>
                                    </div>                                
                                    <div className ="col-md-6 col-sm-6">
                                            <label for="firstName" className="form-label">Хүлээн авагчийн имэйл</label>
                                            <input type="text" className="form-control" id="firstName" placeholder="" value="" required=""></input>
                                    </div>                                
                                    <div className ="col-md-6 col-sm-6">
                                            <label for="firstName" className="form-label">Хүлээн авагчийн утасны дугаар</label>
                                            <input type="text" className="form-control" id="firstName" placeholder="" value="" required=""></input>
                                    </div>                                
                                    <div className ="col-md-6 col-sm-6">
                                            <label for="firstName" className="form-label">Хүлээн авагчийн утасны дугаар</label>
                                            <input type="text" className="form-control" id="firstName" placeholder="" value="" required=""></input>
                                    </div>                                
                                    <div className ="col-md-12 col-sm-12">
                                            <label for="firstName" className="form-label">Мэндчилгээ</label>
                                            <textarea className="form-control" id="firstName" value="" required="">Та илгээх мэндчилгээгээ энд бичнэ үү</textarea>
                                    </div>   
                                    <div className ="col-md-6 col-sm-6">
                                        <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                                    </div>                                
                                    <div className ="col-md-6 col-sm-6">
                                        <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                                    </div>                       
                                </div>
                        </form>
                    </div>
                    {/* Үнэлгээ сэтгэгдэл */}
                    <div className="col-md-6">
                        <div>Үнэлгээ болон сэтгэгдэл (25)</div>                        
                        <div className="card">
                            4.5
                        </div>
                        <div className="comment-card">
                            
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default GiftCard