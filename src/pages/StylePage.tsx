import { IoSunny, IoMoon } from "react-icons/io5";


export default function SelectPage () {
    return (
        <div className="flex justify-between items-end relative h-screen">
            <div className="w-full h-screen">
                <div className="w-full">
                    <div className="m-4 flex items-center justify-between">
                        <h2 className="m-4 text-xl font-bold">Style Guide Demo</h2>
                    </div>
                    
                    <div className="m-4 flex items-center justify-between">
                        <div className="space-x-2">
                            <button className="btn">neutral</button>
                            <button className="btn btn-primary">primaty</button>
                            <button className="btn btn-secondary">secondary</button>
                            <button className="btn btn-accent">accent</button>
                            <button className="btn btn-info">info</button>
                            <button className="btn btn-success">success</button>
                            <button className="btn btn-warning">warning</button>
                            <button className="btn btn-error">error</button>
                        </div>
                        <label className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="theme-controller" value="OrbyDark" />

                            {/* sun icon */}
                            <IoSunny className='swap-on h-8 w-8 fill-current'/>

                            {/* moon icon */}
                            <IoMoon className='swap-off h-8 w-8 fill-current'/>
                        </label>
                    </div>

                    {/* tab */}
                    <div className="m-4 tabs tabs-lifted">
                        <button className="tab">Tab 1</button>
                        <button className="tab tab-active">Tab 2</button>
                        <button className="tab">Tab 3</button>
                    </div>

                    {/* toggle */}
                    <div className="m-4 flex space-x-4">
                        <input type="checkbox" className="toggle toggle-primary" />
                        <input type="checkbox" className="toggle toggle-secondary" />
                        <input type="checkbox" className="toggle toggle-accent" />
                    </div>

                    {/* card */}
                    <div className="card shadow-2xl w-80 m-4">
                    <figure>
                        <img src="https://picsum.photos/id/1005/500/250" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">DaisyUI Card</h2>
                        <p>
                        Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit
                        necessitatibus.
                        </p>
                    </div>
                    </div>

                    {/* steps */}
                    <ul className="steps m-4">
                        <li className="step step-primary">Register</li>
                        <li className="step step-primary">Choose plan</li>
                        <li className="step">Purchase</li>
                        <li className="step">Receive Product</li>
                    </ul>

                    <div className="divider mx-10"></div>

                    {/* COLOR PALLETE */}

                    <div className="collapse collapse-arrow border-base-300 bg-base-200 border mb-5">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">COLOR PALLETE</div>
                        <div className="collapse-content">
                            <div className="px-10 w-full flex flex-col gap-10">
                                
                                <div className="flex justify-between w-full gap-10">

                                    <div className=" aspect-square w-full p-20 bg-primary">
                                        <div className=" aspect-square w-full bg-primary-content"/>
                                    </div>

                                    <div className=" aspect-square w-full p-20 bg-secondary">
                                        <div className=" aspect-square w-full bg-secondary-content"/>
                                    </div>

                                    <div className=" aspect-square w-full p-20 bg-accent">
                                        <div className=" aspect-square w-full bg-accent-content"/>
                                    </div>
                                    
                                    <div className=" aspect-square w-full p-20 bg-info">
                                        <div className=" aspect-square w-full bg-info-content"/>
                                    </div>

                                </div>

                                <div className="flex justify-between w-full gap-10">

                                    <div className=" aspect-square w-full p-20 bg-success">
                                        <div className=" aspect-square w-full bg-success-content"/>
                                    </div>

                                    <div className=" aspect-square w-full p-20 bg-warning">
                                        <div className=" aspect-square w-full bg-warning-content"/>
                                    </div>

                                    <div className=" aspect-square w-full p-20 bg-error">
                                        <div className=" aspect-square w-full bg-error-content"/>
                                    </div>

                                    <div className=" aspect-square w-full p-20 bg-neutral">
                                        <div className=" aspect-square w-full bg-neutral-content"/>
                                    </div>

                                </div>

                                <div className="relative w-full flex flex-col items-center justify-center">
                                    <div className="w-full h-20 bg-base-100 outline-dashed outline-neutral outline-2 -outline-offset-2"/>
                                    <div className="w-full h-20 bg-base-200"/>
                                    <div className="w-full h-20 bg-base-300"/>
                                    <div className="z-10 absolute bg-base-content h-3/4 w-10"/>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow border-base-300 bg-base-200 border">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">TYPES</div>
                        <div className="collapse-content">
                            <div className="px-10 w-full flex flex-col gap-10 prose">
                                
                                <h1>Lorem Ipsum</h1>
                                <h2>Lorem Ipsum</h2>
                                <h3>Lorem Ipsum</h3>
                                <h4>Lorem Ipsum</h4>

                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                <code>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</code>

                                <h5>Lorem Ipsum</h5>
                                <h6>Lorem Ipsum</h6>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};