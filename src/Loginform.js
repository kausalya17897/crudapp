import * as React from 'react';
export function Loginform() {

  return (
<div className="loginform ">
    <form>
      <input type="email" placeholder="enter your email"/>
      <input type="password" placeholder="enter your password"/>
      <button>Submit</button>
    
    </form>
    </div>
  );
}