# Testing Cafe au Chain

Testing the user experience is vital to the success of the Cafe au Chain platform. 

Test URL for roasters: [http://demo.proofofperk.com](http://demo.proofofperk.com)

Test URL for customers (for provisional roaster): [http://pendragon-coffee.proofofperk.com](http://pendragon-coffee.proofofperk.com)

To test roasters you create, go to the subdomain you create for that roaster on proofofperk.com. For example, if you create a roaster called Daybreak Coffee with the subdomain `daybreak-coffee`, the URL to test the customer-facing side for that roaster's products is [http://daybreak-coffee.proofofperk.com](http://daybreak-coffee.proofofperk.com)

## Test account numbers, credentials, etc

Credit card: 4242 4242 4242 4242

Exp Date: 12/23

CVC: 123

Routing number: 110000000

Account number: 000123456789

Business Tax Id: 000000000

SSN: 000000000

Verification Image - needed for wholesale setup: [https://stripe.com/img/docs/connect/success.png](https://stripe.com/img/docs/connect/success.png)

## Using the issue tracker

The issue tracker is the preferred channel for [bug reports](#bugs).

<a name="bugs"></a>
## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; create a [reduced test
   case](http://css-tricks.com/reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? What would you expect to be the outcome? All these
details will help people to fix any potential bugs.

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

# Writing Good GitHub Issues

GitHub issues are where discussions about open source projects happen. Getting good at writing GitHub issues will get you more help building your projects as well as improve your practice of building open source.

Good issues will get you more help by making it easy for outside contributors to understand your project and help you out.

Good issues are also professional development. Many technology and [government](https://18f.gsa.gov/) jobs have a remote first work style where all conversations happen online in tools like GitHub issues. Having a public trail of well formed issues can help get you paid.  :moneybag::moneybag::moneybag:

#### Example
A favorite [example](https://github.com/codeforamerica/brigade/issues/344).

It clearly describes what is going on, includes relevant user research, points to the necessary files, and has a checklist of actions to take. The conversation is pretty good too, with lots of code samples and references to the issue from commits.

#### Sections
Common sections to include in your issue. Don't go overboard, just use what you need.
```
#### Description
#### Screenshots
#### To Reproduce
#### Files
#### Tasks
```

#### Template
To easily start a new issue with all of these sections, use this [template](https://github.com/codeforamerica/howto/issues/new?title=Descriptive+issue+title&body=%23%23%23%23+Description%0AA+clear+and+concise+description+of+what+the+issue+is+about.%0A%0A%23%23%23%23+Screenshots%0A![Downhill+Windmills](http://i.giphy.com/KO8AG2EByqkFi.gif)%0A%0A%23%23%23%23+Files%0AA+list+of+relevant+files+for+this+issue.+This+will+help+people+navigate+the+project+and+offer+some+clues+of+where+to+start.%0A%0A%23%23%23%23+To+Reproduce%0AIf+this+issue+is+describing+a+bug,+include+some+steps+to+reproduce+the+behavior.%0A%0A%23%23%23%23+Tasks%0AInclude+specific+tasks+in+the+order+they+need+to+be+done+in.+Include+links+to+specific+lines+of+code+where+the+task+should+happen+at.%0A-+[+]+Task+1%0A-+[+]+Task+2%0A-+[+]+Task+3%0A%0ARemember+to+use+helpful+labels+and+milestones.+If+you+use+the+%22help+wanted%22+label,+Code+for+America+will+[promote+it+widely](http://www.codeforamerica.org/geeks/civicissues).&labels=help+wanted)


#### Labels
GitHub [labels](https://github.com/codeforamerica/howto/labels) are a quick way to categorize your issues. `bug` and `enhancement` are really useful when trying to organize our sprints. 

#### Milestones
Milestones are useful way to group issues together with a due date. 

GitHub has [a useful guide](https://guides.github.com/features/issues/) that goes even deeper.



