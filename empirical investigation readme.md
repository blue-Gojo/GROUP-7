mindPal Empirical Investigation 

1. SE INVESTIGATION APPROACH
The development and evaluation of MindPal followed the empirical investigation framework 
described in Chapter 4. Rather than building the system on assumptions alone, the development 
process applied scientific principles to investigate whether an AI-powered therapeutic chatbot 
could deliver clinically meaningful support through a free, accessible architecture. 
The investigation addressed the following core questions. Can a large language model 
constrained by structured therapeutic system prompts produce responses consistent with 
evidence-based clinical practice? Does the Node.js and Groq API architecture provide sufficient 
reliability and response speed for real-time emotional support interactions? Can a non-technical 
user begin a therapeutic session within seconds of opening the application without any 
instruction? 
These questions guided every design and implementation decision throughout the project, 
placing the investigation firmly within the SE investigation framework of hypothesis generation, 
data collection, data evaluation, and data interpretation feeding back into an iterative 
improvement process. 

2. HYPOTHESIS STATEMENT
Following investigation principle 1 (stating the hypothesis), the primary hypothesis of the 
MindPal investigation was stated as follows before any implementation began. 
Primary hypothesis: A Node.js web application using the Groq API with structured clinical 
system prompts can deliver therapeutically appropriate, empathetic, and clinically grounded 
responses across nine distinct mental health domains, accessible to any user via browser without 
requiring technical knowledge or financial cost. 
Secondary hypothesis: Server-side API key management using a .env file and Node.js proxy 
architecture is sufficient to protect credentials while maintaining full functionality of the 
therapeutic chatbot across Windows, macOS, and Linux environments. 
These hypotheses are stated in quantifiable terms consistent with guideline C2, and are derived 
from the theoretical basis that large language models constrained by domain-specific prompts 
can approximate the behaviour of trained practitioners when the prompts are grounded in peerreviewed clinical frameworks. 

3. INVESTIGATION TECHNIQUE SELECTION
Following the course framework of three investigation techniques (formal experiment, case 
study, and survey), the MindPal investigation used a combination of a case study during 
development and informal experiments during validation. The overall investigation was conducted as a case study in the course framework sense. The 
development of MindPal was a first-time application of the Groq API and Node.js proxy 
architecture to a therapeutic chatbot context. After each implementation phase was completed, a 
case study approach was used to capture the effort involved, the failures encountered, and the 
outcomes achieved. For example, the discovery that the API key was not loading correctly 
because it was placed on the wrong line in the .env file was captured as a case study finding that 
informed the README documentation and the server-side key validation logic. 
Informal experiments were conducted to test specific hypotheses. To test whether the system 
prompt differentiation between therapy modes was sufficient, an identical user input was 
submitted to all nine modes and the responses were compared. This constitutes a controlled 
investigation of a specific factor (system prompt content) with a documented input (identical 
message) and a measurable output (clinical distinctiveness of response), satisfying the definition 
of a formal experiment at small scale. 
The case study approach was preferred over a full formal experiment because, as noted in the 
course comparison table, case studies have lower replication cost and are more appropriate when 
level of control is harder to achieve, which is the case when investigating AI-generated output 
quality rather than a deterministic process. 

4. INDEPENDENT AND DEPENDENT VARIABLES
Following investigation principle 3 (maintaining control over variables), the following 
independent and dependent variables were identified for the MindPal investigation. 
Independent variables: therapy mode selected (nominal, nine categories), model temperature 
setting (continuous, fixed at 0.75), maximum token limit (integer, fixed at 800), user input 
content (the message submitted), and API key validity (binary). 
Dependent variables: clinical appropriateness of response (assessed by presence of validation, 
reflective listening, and one therapeutic technique), response latency in milliseconds, system 
stability (binary pass or fail of error handling), and user accessibility measured as number of 
interactions required before first AI response. 
The model temperature and token limit were held constant across all tests, following the 
principle of controlling other variables so that observed differences in response quality could be 
attributed to the independent variable of therapy mode selection rather than to variation in model 
configuration. This directly addresses the common mistake identified in the course of ignoring 
other variables that may affect the dependent variable. 
The causal ordering of variables can be expressed following the course notation. Therapy mode 
selection causes system prompt selection. System prompt selection causes the clinical framing of 
the Groq API call. The clinical framing of the API call causes the content and approach of the AI 
response. The AI response content causes the therapeutic quality outcome. This causal chain 
confirms that therapy mode is the true independent variable and therapeutic quality is the true dependent variable, with system prompt selection and API framing as intermediate causal 
variables. 

5. FORMAL EXPERIMENT PLANNING
The MindPal investigation followed the six-phase formal experiment planning structure from the 
course. 
Conception: The goal of the investigation was defined as determining whether structured 
therapeutic system prompts delivered via the Groq API could produce clinically distinguishable 
and appropriate responses for users experiencing mental health distress. 
Design: The quantifiable hypothesis was that responses generated in CBT mode would contain 
named cognitive distortions and thought record language that was absent from responses 
generated in Mindfulness mode for the same user input. Experimental objects were the nine 
therapy mode system prompts. Experimental subjects were the AI-generated responses. The 
response variable was the presence or absence of mode-specific clinical language. 
Preparation: System prompts were written for all nine therapy modes based on peer-reviewed 
clinical frameworks. The Node.js server was configured with consistent model settings. The 
frontend interface was completed to allow mode switching between API calls. 
Execution: Identical user inputs were submitted across all nine modes and responses were 
recorded and compared. 
Review and analysis: Responses were reviewed for the presence of mode-specific clinical 
language. CBT mode responses consistently contained cognitive distortion identification and 
thought record language. DBT mode responses consistently referenced TIPP, ACCEPTS, and 
DEAR MAN skills. Mindfulness mode responses consistently used STOP, RAIN, and body scan 
language. The hypothesis was confirmed. 
Dissemination and decision making: The finding that system prompts successfully produce 
clinically distinct responses confirmed the architectural decision to use a prompt-based approach 
rather than separate models per mode, and confirmed that the system was ready for deployment. 

6. EXPERIMENT PRINCIPLES APPLIED
Replication: The experiment was designed to be fully replicable. Any evaluator submitting the 
same user input to the same therapy mode on the same server instance will receive a response 
governed by the same system prompt and the same model configuration. The temperature setting 
of 0.75 introduces controlled variation while maintaining reproducible response character. The 
server architecture ensures that every request follows the identical code path. 
Randomization: The Groq API's language model introduces natural variation in responses to 
identical inputs, which functions as the equivalent of randomization in this investigation. This 
prevents the results from being confounded by a single memorised response and ensures that the observed clinical appropriateness reflects genuine prompt-driven behaviour rather than a cached 
output. 
Blocking and balancing: The nine therapy modes were treated as nine blocks in the experimental 
design, each representing a distinct clinical domain. Testing was balanced by submitting the 
same input across all nine modes so that no single mode was over-represented in the evaluation. 
This mirrors the blocking strategy described in the course where developers from different 
universities were assigned to separate blocks to isolate the variable of interest. 
Baseline: A baseline was established using the General Support mode, which applies the full 
multi-modal therapeutic approach without specialisation. Responses from specialised modes 
were compared against this baseline to assess whether specialisation produced meaningfully 
distinct clinical output. The baseline also served as the standard against which error handling 
behaviour was evaluated, confirming that the fallback response when API calls fail maintains the 
same warm therapeutic tone as normal operation. 

7. DATA COLLECTION
Following the empirical research guideline DC1, all software measures were fully defined 
including entity, attribute, unit, and counting rules as detailed in the GQ(I)M section of this 
document. 
The data collection method used in the MindPal investigation was third degree contact as defined 
in the course framework, specifically analysis of tool logs and off-line monitoring. Data was 
collected by reviewing server console output, browser developer tools network tab response 
times, and the content of AI-generated responses across modes. No direct participant observation 
was used as the investigation was conducted by the developer in a laboratory setting rather than 
with external users. 
Following guideline DC2, quality control of data collection was maintained by ensuring that 
every test submission used a freshly initialised conversation history with no prior context that 
could bias the AI response. Each mode was tested in isolation before testing mode-switching 
within a session to separate the effects of session context from the effects of mode selection. 
Following guideline DC4, data about other performance measures potentially affected by the 
treatment were also recorded. Specifically, response latency was recorded alongside clinical 
quality because a system that produces clinically appropriate responses but with unacceptable 
delay would fail the accessibility requirement of the primary hypothesis. Groq's response latency 
was consistently under two seconds for all test submissions, confirming that the provider 
selection did not adversely affect the time-behaviour quality attribute. 
8. ANALYSIS AND INTERPRETATION
Following analysis guideline A4, the data collected was checked against the assumptions of the 
evaluation method before conclusions were drawn. The primary assumption was that the 
presence of mode-specific clinical language in AI responses is a valid indicator of therapeutic appropriateness. This assumption is supported by the fact that the clinical language evaluated 
(cognitive distortion names in CBT, DBT skill acronyms in DBT, RAIN and STOP in 
Mindfulness) is not generic language that would appear in any response but is domain-specific 
terminology that can only appear if the system prompt is correctly guiding the model. 
Following interpretation guideline I2, the distinction between statistical significance and 
practical importance was considered. The sample of test responses was small and not statistically 
significant in a formal sense. However, the practical importance of the finding is sufficient for 
the purposes of this investigation. The consistent presence of mode-specific clinical language 
across repeated submissions to the same mode, and its consistent absence in other modes, 
provides practical confirmation that the system prompt architecture is functioning as designed. 
Following interpretation guideline I3, the limitations of the investigation are stated as follows. 
The investigation was conducted by the developer rather than by independent evaluators, 
introducing potential confirmation bias. The evaluation of clinical appropriateness was based on 
the presence of clinical terminology rather than on assessment by a licensed therapist. The user 
population was not sampled as no external users participated in testing. These limitations mean 
that the findings confirm architectural correctness and prompt differentiation but do not 
constitute clinical validation of therapeutic effectiveness, which would require a formal study 
with licensed clinical oversight and a representative sample of users experiencing genuine mental 
health distress. 